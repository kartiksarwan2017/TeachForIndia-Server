const Admin = require("../models/admin");
const Volunteer = require("../models/volunteer");
const Classroom = require('../models/classroom');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const secretKey = '56WiKUgEtciaSVPX7ZqMLpTsOAI1L5TF';


module.exports.Register = async (req, res) => {

  try {

    const {email, confirm_password, password} = req.body;

    const admin = await Admin.findOne({email: email});

    if(admin){

      return res.status(403).json({
        "message": "Admin Already Exists!"
      });

    }

    if(password !== confirm_password){
      return res.status(401).json({
        "message": "Password Doesn't Matched!"
      });
    }

    const newAdmin = await Admin.create(req.body);

    return res.status(201).json({
      "message": "Admin Created Successfully!",
       newAdmin
    });

  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports.Login = async (req, res) => {

  const { email, password } = req.body;

  try {

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password!" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password!" });
    }

    const token = jwt.sign({ adminId: admin._id }, secretKey, {
      expiresIn: "1h",
    });

    return res.status(200).json({ message: "Login successful!", token });

  } catch (error) {

    return res.status(500).json({ message: "An error occurred during login!" });

  }
};

module.exports.getAllVolunteers = async (req, res) => {

  try {

    const volunteers = await Volunteer.find();
    return res.status(200).json({
       volunteers,
      "message": "List of all volunteers!"
    });

  } catch (error) {

    return res.status(500).json({ message: "Could not fetch volunteers!" });
    
  }
};


module.exports.getSpecificVolunteer = async (req, res) => {

  try {

    const id = req.params.id;



    const volunteer = await Volunteer.findOne({_id: id});
    return res.status(200).json({
       volunteer,
      "message": "Specific Volunteer Details!"
    });

  } catch (error) {

    return res.status(500).json({ message: "Could not fetch volunteers!" });
    
  }
};




module.exports.allocateClassroomsToVolunteers = async (req, res) => {

  try {

  // Retrieve classrooms from the database
  const classrooms = await Classroom.find().lean();

  // Retrieve volunteers from the database
  const volunteers = await Volunteer.find().lean();

  // Sort classrooms by capacity (ascending)
  classrooms.sort((a, b) => a.capacity - b.capacity);

  const allocatedClassrooms = {};

  // Allocate volunteers to classrooms based on capacity
  let allocatedVolunteersCount = 0;
  for (const classroom of classrooms) {
    const availableSeats = classroom.capacity - (allocatedClassrooms[classroom.classroomID]?.length || 0);
    const volunteersForClassroom = volunteers.slice(allocatedVolunteersCount, allocatedVolunteersCount + availableSeats);
    allocatedVolunteersCount += availableSeats;


    // Store volunteer _id in classroom
    const volunteerIds = volunteersForClassroom.map(volunteer => volunteer._id);
    await Classroom.updateOne({ _id: classroom._id }, { $set: { volunteers: volunteerIds } });

    // Store classroom _id in volunteers
    const classroomId = classroom._id;
    for (const volunteer of volunteersForClassroom) {
      await Volunteer.updateOne({ _id: volunteer._id }, { $set: { classroom: classroomId } });
    }

    allocatedClassrooms[classroom.classroomID] = volunteersForClassroom;

  }

  // Respond with the allocated classrooms data
  return res.json({
    allocatedClassrooms,
    "message": "Classroom Allocated Successfully!"
  });

} catch (error) {
  return res.status(500).json({ message: 'Internal Server Error' });
}
}
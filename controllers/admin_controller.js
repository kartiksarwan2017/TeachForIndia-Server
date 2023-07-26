const Admin = require("../models/admin");
const Volunteer = require("../models/volunteer");
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
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

module.exports.Login = async (req, res) => {

  const { email, password } = req.body;

  try {

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ error: "Invalid email or password!" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password!" });
    }

    const token = jwt.sign({ adminId: admin._id }, secretKey, {
      expiresIn: "1h",
    });

    return res.status(200).json({ message: "Login successful!", token });

  } catch (error) {

    return res.status(500).json({ error: "An error occurred during login!" });

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

    return res.status(500).json({ error: "Could not fetch volunteers!" });
    
  }
};

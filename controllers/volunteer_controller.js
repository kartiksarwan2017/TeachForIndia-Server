const Volunteer = require('../models/volunteer');
const Languages = require('../models/languages');
const Availability = require('../models/availability');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = '56WiKUgEtciaSVPX7ZqMLpTsOAI1L5TF';


module.exports.Register = async (req, res) => {
    try {
    
    const {email, confirm_password, password} = req.body;

    const volunteer = await Volunteer.findOne({email: email});

    if(volunteer){

      return res.status(403).json({
        "message": "Volunteer Already Exists!"
      });

    }

    if(password !== confirm_password){

      return res.status(401).json({
        "message": "Password Doesn't Matched!"
      });

    }

      const newVolunteer = await Volunteer.create(req.body);

      return res.status(201).json({
        newVolunteer,
        "message": "Volunteer Created Successfully!"
      });

    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error!' });
    }
  };
  
  module.exports.Login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const volunteer = await Volunteer.findOne({ email });
      if (!volunteer) {
        return res.status(401).json({ error: 'Invalid email or password!' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, volunteer.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password!' });
      }
  
      const token = jwt.sign({ userId: volunteer._id }, secretKey, { expiresIn: '1h' });
      res.status(200).json({ message: 'Login successful!', token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred during login!' });
    }
  };

  module.exports.AddLanguages = async (req, res) => {
    
    try{

      const volunteerId = req.params.volunteerId;

      const {languageName} = req.body;
  
      const volunteer = await Volunteer.findOne({volunteerId: volunteerId});
  
      if(!volunteer){
        return res.status(401).json({
          message: "Volunteer ID Not found!"
      });
      }

      const addNewLanguage = await Languages.create({
       languageName 
      });


      volunteer.languagesRequired.push(addNewLanguage._id);

      await volunteer.save();

  
      return res.json({
          languageAdded: addNewLanguage,
          message: "Languages Added Successfully!!!"
      });

    }catch(error){
      console.log(error);
      return res.status(500).send({message: "Internal Server Error"});
    }

  }


  module.exports.AddAvailibility = async (req, res) => {
    try{

      const volunteerId = req.params.volunteerId;

      const volunteer = await Volunteer.findOne({volunteerId: volunteerId});
  
      if(!volunteer){
        return res.status(401).json({
          message: "Volunteer ID Not found!"
      });
      }

      const addNewAvailability = await Availability.create(req.body);

      volunteer.availability.push(addNewAvailability._id);

      await volunteer.save();

      return res.json({
          availibilityAdded: addNewAvailability,
          message: "Availability Added Successfully!!!"
      });

    }catch(error){
      console.log(error);
      return res.status(500).send({message: "Internal Server Error"});
    }
  }
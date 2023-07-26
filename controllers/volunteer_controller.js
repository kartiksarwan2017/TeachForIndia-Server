const Volunteer = require('../models/volunteer');
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
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const volunteerSchema = new mongoose.Schema({
    classroom: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Classroom', 
        default: null 
    },
    name: { 
        type: String, 
        required: true 
    },
    email: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contact: { 
        type: String, 
        required: true 
    },
    location: { 
        type: String, 
        required: true 
    },
    languagesSpoken: {
        type: [String], // Array of days of the week the volunteer is available
        required: true
    },
    availability: {
        type: [String],
        required: true
    } 
  }, {
    timestamps: true
  });


  volunteerSchema.pre('save', async function (next) {
    const volunteer = this;
    if (!volunteer.isModified('password')) return next();
  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(volunteer.password, salt);
    volunteer.password = hashedPassword;
    next();
  });
  
  
const Volunteer = mongoose.model('volunteer', volunteerSchema);
module.exports = Volunteer;
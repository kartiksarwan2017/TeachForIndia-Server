const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({

    volunteerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "volunteer"
    },
    days: {
        type: String, 
        required: true
    }

}, {
    timestamps: true
});

const Availability = mongoose.model('availability', availabilitySchema);
module.exports = Availability;
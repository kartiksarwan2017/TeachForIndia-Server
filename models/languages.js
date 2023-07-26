const mongoose = require('mongoose');

const languagesSchema = new mongoose.Schema({
    volunteerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "volunteer"
    },
    languageName: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

const Languages = mongoose.model('languages', languagesSchema);
module.exports = Languages;
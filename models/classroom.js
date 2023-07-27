const mongoose = require("mongoose");

const classroomSchema = new mongoose.Schema(
  {
    classroomID: {
      type: String,
      required: true,
    },
    volunteers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "volunteer",
    }],
    capacity: {
      type: Number,
      required: true,
    },
    requirement: {
      type: Number,
      required: true,
    },
    subjects: {
      type: [String],
      required: true,
    },
    languageRequirement: {
      type: [String],
      default: [],
    },
    location: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Classroom = mongoose.model("classroom", classroomSchema);
module.exports = Classroom;

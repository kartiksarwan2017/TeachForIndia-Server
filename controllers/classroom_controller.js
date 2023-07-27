const Classroom = require('../models/classroom');
const Volunteer = require('../models/volunteer');

module.exports.CreateClassroom = async (req, res) => {

    try{

        const classroom = await Classroom.findOne({classroomID: req.body.classroomID}).populate('volunteer');

        if(classroom){
            return res.status(403).json({
                "message": "Cassroom Already Exists!"
            });
        }

        const newClassroom = await Classroom.create(req.body);

        return res.status(201).json({
            newClassroom,
            "message": "Classroom Created Successfully!"
        });

    }catch(error){
        return res.status(500).json({
            "message": "Internal Server Error"
        });
    }
}
const express = require('express');
const router = express.Router();
const classroomController = require('../controllers/classroom_controller');

router.post('/add-new-classroom', classroomController.CreateClassroom);

module.exports = router;
const express = require('express');
const router = express.Router();
const VolunteerController = require('../controllers/volunteer_controller');


router.post('/register', VolunteerController.Register);
router.post('/login', VolunteerController.Login);

module.exports = router;
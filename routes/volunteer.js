const express = require('express');
const router = express.Router();
const VolunteerController = require('../controllers/volunteer_controller');


router.post('/register', VolunteerController.Register);
router.post('/login', VolunteerController.Login);
router.post('/add-new-language/:id', VolunteerController.AddLanguages);
router.post('/add-new-availibility/:id', VolunteerController.AddAvailibility);

module.exports = router;
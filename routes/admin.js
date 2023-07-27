const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin_controller');

router.post('/register', AdminController.Register);
router.post('/login', AdminController.Login);
router.get('/volunteers-list', AdminController.getAllVolunteers);
router.post('/allocate-classroom-to-volunteers', AdminController.allocateClassroomsToVolunteers);


module.exports = router;
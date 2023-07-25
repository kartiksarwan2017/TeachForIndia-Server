const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json('Welcome to Teach for India Online Classroom!');
});

module.exports = router;
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.json({"message": "to my Backend Software for the TeachForIndia Online Classroom Web App"})
});

module.exports = router;
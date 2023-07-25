const mongoose = require('mongoose');
require('dotenv').config();

// Set up default mongoose connection
let mongoDB = process.env.MongoDB_URL;
const db = mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("CONNECTION ESTABLISHED"));

module.exports = db;
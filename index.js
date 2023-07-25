const express = require('express');
const db = require('./config/mongoose');
const cors = require('cors');
const port = 8000;
const app = express();
require('dotenv').config()

app.use(cors());
app.use('/', require('./routes'));

app.listen(port, (err) => {

    if(err){
        console.log(`Error while running server: ${err}`);
        return;
    }

    console.log(`Server is running on port: ${port}`);
})


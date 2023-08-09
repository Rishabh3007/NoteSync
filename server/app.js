const dotenv = require('dotenv');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());

dotenv.config({ path: '.env' }); //we can use this to set up environment variables in our application and then we can access them anywhere in our application

require('./db/conn'); //we can use this to connect to our database

app.use(require('./routes/auth')); //we can use this to link our routes files

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`app listening on port ${port}!`);
});
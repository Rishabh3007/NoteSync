const mongoose = require('mongoose');
const dotenv = require('dotenv');

const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch((err) => {
    console.log('Failed to connect to MongoDB Atlas');
    console.log(err); 
});
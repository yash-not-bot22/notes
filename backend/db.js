
// getting-started.js
const mongoose = require('mongoose');
require("dotenv").config();

 


//if not coonecting in atlas jus delete the ip and re enter it

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  const connectToMongoose = async () => {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to myDB");
  }
  connectToMongoose().catch((err) => console.error(err));
  
  
  

module.exports = connectToMongoose;

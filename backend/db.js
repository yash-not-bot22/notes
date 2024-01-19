
// getting-started.js
const mongoose = require('mongoose');
require("dotenv").config();

 connectToMongoose();


async function connectToMongoose() {
  try{await mongoose.connect("mongodb+srv://yashbaghel:1234yashyashB@cluster0.7x2ongh.mongodb.net/?retryWrites=true&w=majority");
  console.log('database connected')}catch(e){
    console.log(e);
  }
  //if not coonecting in atlas jus delete the ip and re enter it

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

module.exports = connectToMongoose;

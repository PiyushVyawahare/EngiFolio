const dotenv = require("dotenv");
dotenv.config();

module.exports.init = function(){
  const mongoose = require("mongoose");
  console.log(process.env)
  mongoose.connect("mongodb+srv://ecom:1234567890@cluster0.tt9fs.mongodb.net/EngiFolio?retryWrites=true&w=majority")
  .then(function(){
      console.log("db is live");
  })
  .catch(function(){
      console.log("error");
  })
}
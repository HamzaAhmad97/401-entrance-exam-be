const mongoose = require('mongoose');
let userSchema = new mongoose.Schema({
  name: String,
  email: String,
  favorites: [
    {
      name: String,
      image: String,
      price: Number
    }
  ]
})

let userModel = mongoose.model('fruits', userSchema);

module.exports = { userModel }
let userModel = require('../Models/models').userModel;
const axios = require('axios');
const main = (req, res) => {
  res.send('up and running ...')
};
const getAllFavorites = (email, res) => {
  userModel.findOne({email}, (err, result) => {
    if (err) {res.status(404).send('error fetching favorites')}
    else {
      res.send(result.favorites)
    }
  })
}

const addUser = (req, res)=> {
  let {email, name} = req.body;
  userModel.findOne({email}, (err, result) => {
    if (err) {res.status(404).send('error adding new user')}
    else {
      console.log(result)
      if (result === null || result.length === 0) {
        let newUser = new userModel({email, name, favorites: []});
        newUser.save();
        res.send('user added successfully')
      }
      else {
        res.send('user is already there')
      }
    }
  })
}

const getAllFruits = (req, res) => {
  axios.get('https://fruit-api-301.herokuapp.com/getFruit')
  .then(val => {
    res.send(val.data.fruits);
  })
  .catch(err => {
    res.status(404).send('error fetching fruits data')
  })
}

const addToFavorites = (req, res) => {
  let {fruitData, email} = req.body;
  let {name, image, price} = fruitData;
  userModel.findOneAndUpdate({email}, {$addToSet : {favorites : {name, image, price}}}, (err, result) => {
    if (err) {res.status(404).send('error adding fruit to favorites')}
    else {
      res.send('added to favorites')
    }
  })
}

const getFavorties = (req, res) => {
  let {email} = req.query;
  userModel.findOne({email}, (err, result) => {
    if (err) {res.status(404).send('error fetching favorties')}
    else {
      if (result === null) {
        res.send([])
      } else {
        res.send(result.favorites)
      }
      
    }
  })
}
const removeFromFavorites = (req, res)=> {
  let {name, email} = req.params;
  userModel.findOneAndUpdate({email}, {$pull: {favorites : {name}}}, (err, result) => {
    if (err) {res.status(404).send('error removing from favorites')}
    else {
      getAllFavorites(email, res);
    }
  })
}

const updateOneFromFavorites = (req, res) => {
  let {name, email} = req.params;
  let {newName, newPrice, newImage} = req.body;
  userModel.findOneAndUpdate({email, favorites : {$elemMatch : {name: name}}}, {$set : {
    "favorites.$.name": newName,
    "favorites.$.image": newImage,
    "favorites.$.price" : newPrice
  }},
  (err, result) => {
    if (err) {res.status(404).send('error while updating item in favorites')}
    else {
      //console.log(result)
      getAllFavorites(email, res)
    }
  })
}
const getUsers = (req, res) => {
  let {email} = req.query;
  userModel.findOne({email}, (err, result) => {
    if (err) {res.status(404).send('error while fetching user ')}
    else {
      res.send(result)
    }
  })
}

module.exports = {main, getAllFavorites, addUser, getAllFruits, addToFavorites, getFavorties, removeFromFavorites, updateOneFromFavorites, getUsers}
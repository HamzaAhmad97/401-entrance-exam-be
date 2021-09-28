const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
const mongoose = require('mongoose');
const { application } = require('express');
const port = process.env.PORT;
mongoose.connect('mongodb://HamzaAhmad:eventome2021@cluster0-shard-00-00.129zx.mongodb.net:27017,cluster0-shard-00-01.129zx.mongodb.net:27017,cluster0-shard-00-02.129zx.mongodb.net:27017/fruits?ssl=true&replicaSet=atlas-meneia-shard-0&authSource=admin&retryWrites=true&w=majority', {useNewUrlParser: true});
const connection = mongoose.connection;
connection.once('open', () => console.log('fruits db is up and running ...'))

let userModel = require('./Models/models').userModel;
let {getAllFavorites, main, addUser, getAllFruits, addToFavorites, getFavorties, removeFromFavorites, updateOneFromFavorites, getUsers} = require('./controllers/controllers')

app.get('/', main)

app.post('/user', addUser)

app.get('/fruits', getAllFruits)

app.post('/addToFavorites', addToFavorites)

app.get('/getFavorties',getFavorties )

app.delete('/removeFromFavorites/:name/:email', removeFromFavorites)

app.get('/user', getUsers)

app.put('/updateOneFromFavorites/:name/:email', updateOneFromFavorites)

app.listen(port, () => console.log(`server is up and running and listeing on port ${port}`))
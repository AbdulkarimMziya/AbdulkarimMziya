// run code to initialize mongodb
// sudo mongod --dbpath=/Users/akmziya/data/db

// install express: npm install express

// to install nodemon: npm install nodemon --save-dev
// to run nodemon: npx nodemon index.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// setup express app
const app = express()

// connect to mongoDB
mongoose.connect('mongodb://localhost/ninjago')
        .then(() => console.log('Successfully connected to MongoDB.'))
        .catch(err => console.error('Connection error:', err));


app.use(bodyParser.json())

// initialize routes
app.use('/api',require('./routes/api'))         // const routes = require('./routes/api');

// error handling middleware
app.use(function(err,req, res, next){
    console.log(err.message)
    res.status(422).send(
        {error: err.message}
    )
})


// app.get('/', function(req,res) {
//     console.log("GET request")
//     res.end()
// })

// listen for request
app.listen(process.env.port || 4000, function(){
    console.log("now listening to requests!!!")
})
const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja')

// get a list of ninjas in the db
router.get('/ninjas', function(req, res, next) {
    // 1. Convert query strings to numbers
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);

    // 2. Use Aggregate with $geoNear (The modern replacement)
    Ninja.aggregate([
        {
            $geoNear: {
                near: { 
                    type: 'Point', 
                    coordinates: [lng, lat] 
                },
                distanceField: "dist.calculated", // required: adds distance to the result
                maxDistance: 100000,             // distance in meters (100km)
                spherical: true
            }
        }
    ])
    .then(function(ninjas) {
        res.send(ninjas);
    })
    .catch(next); // This sends the error to your error handling middleware
});


// creat a ninjas in the db
router.post('/ninjas', function(req,res,next){
    Ninja.create(req.body)
        .then(function(ninja){
            res.send(ninja)
        }).catch(next)
    
})

// update a ninja in the db
router.put('/ninjas/:id', function(req,res,next){
    Ninja.findByIdAndUpdate({_id:req.params.id}, req.body)
        .then(function(){

            Ninja.findOne({_id:req.params.id})
                .then(function(ninja){
                    res.send(ninja)
                })
        })
})

// delete a ninjas from the db
router.delete('/ninjas/:id', function(req,res,next){
    Ninja.findByIdAndDelete({_id:req.params.id})
        .then(function(ninja) {
            res.send(ninja)
        })
    
})

module.exports = router
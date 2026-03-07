const mongoose = require('mongoose');

const Schema = mongoose.Schema

// Create geolocation Schema
const GeoSchema = new Schema({
    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
});

// create ninja Schema & model
const NinjaSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    rank: {
        type: String
    },
    isAvailable: {
        type: Boolean,
        default: false
    },
    geometry: GeoSchema
}) 

const Ninja = mongoose.model('ninja', NinjaSchema)

module.exports = Ninja
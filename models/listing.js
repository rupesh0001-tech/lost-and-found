const mongoose = require('mongoose');
const User = require('./user.js');

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, // mandatory
        trim: true
    },

    describtion: {
        type: String,
        required: true,
        
    },
    describtionArr: [{
        type : Array
    }],
    img: {
        type: String,
    },
    location: {
        type: String,
        required: true, // mandatory
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

    Author: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

module.exports = mongoose.model('Item', itemSchema);
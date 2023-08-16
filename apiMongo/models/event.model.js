const mongoose = require("mongoose");

const eventschema = new mongoose.Schema({
    title: String,
    start: Date,
    end: Date,
    color: String,
    
})

module.exports = mongoose.model('Events',eventschema)
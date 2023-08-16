const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator')

const userschema = new mongoose.Schema({
    username: {
        type:String,
        unique: true
    },
    password: String,

},{timestamps: true})

userschema.plugin(uniqueValidator)

module.exports = mongoose.model('user',userschema)
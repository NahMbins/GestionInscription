const mongoose = require("mongoose");

const etudiantschema = new mongoose.Schema({
    nom: String, 
    prenom: String,
    niveau: String,
    email: String,
    tel: {
      type: String,
      minlength: 10,
      maxlength: 10,
    },

    formation: String,

    ref: {
      type: Number,
      required: true,
      unique: true,
      
    },
    status: {
      type: Boolean,
      default: false,
    },
   
},{timestamps: true})

module.exports = mongoose.model('Etudiants',etudiantschema)
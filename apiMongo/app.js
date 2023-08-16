const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");


//connection
const mongoose = require('mongoose');
// const url = 'mongodb+srv://admin:admin@cluster0.vxi3fyo.mongodb.net/inscription?retryWrites=true&w=majority';
const url = 'mongodb://127.0.0.1:27017/inscription'
mongoose.connect(url,{useNewUrlParser:true})
const con = mongoose.connection;
con.on('open', function(){
    console.log('connected');
})
//end connection

app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

var corsOptions = {
  origin: "*"
};
app.use(cors(corsOptions));

//Routes
const routes = require("./routes/etudiants.route");
app.use('/api/etudiant', routes);

//sms
// const client = require('twilio')(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );


app.listen(3001,()=>{console.log('listen on port 3001')});
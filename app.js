const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//Connect to Database
mongoose.connect(config.database,{useNewUrlParser: true});

//On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

//On Connection error
mongoose.connection.on('error', (error) => {     //tell the error if it occurs
    console.log('Database Error'+ error)
});

const app = express();

const users = require('./routes/users');

// Port Number
const port = process.env.PORT || 8080;

//cors middleware
app.use(cors());

//Set static file
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser MiddleWare
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

// Index Route
app.get('/', (req,res)=>{
   res.send('Invalid Endpoint'); 
});

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start Server
app.listen(port, ()=>{
    console.log('Server started on Port'+port);
});
/*
* Created By Suyash Tiwari
* on 5 August 2018
*/
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(cors());

const dbConfig = require('./config/secret');

app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({ extended:true,limit:'50mb'}));
app.use(cookieParser());
app.use((req, res, next)  => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header('Access-Control-Allow-Methods', 'GET', 'POST', 'DELETE', 'PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url,{ useNewUrlParser: true } );

const auth = require('./routes/authRoutes');
const posts = require('./routes/postRoutes');

app.use('/api/chatapp',auth);
app.use('/api/chatapp',posts);


app.listen(3000, () => {
    console.log('Running on port 3000')
});
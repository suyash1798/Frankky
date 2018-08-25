const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();

const dbConfig = require('./config/secret');

app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({ extended:true}));
app.use(cookieParser());
// app.use(logger('dev'));

mongoose.connect(dbConfig.url,{ useNewUrlParser: true } );

const auth = require('./routes/authRoutes');

app.use('/api/chatapp',auth);

app.listen(4000, () => {
    console.log('Running on port 3000')
});
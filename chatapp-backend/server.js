/*
* Created By Suyash Tiwari
* on 5 August 2018
*/
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const _ = require('lodash');

const app = express();

app.use(cors());

const dbConfig = require('./config/secret');

const server = require('http').Server(app);
const io = require('socket.io')(server);
server.listen(3000);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header('Access-Control-Allow-Methods', 'GET', 'POST', 'DELETE', 'PUT', 'OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    next();
});

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true, limit: '50mb'}));
app.use(cookieParser());

const { User } = require('./Helpers/UserClass');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {useNewUrlParser: true});

require('./socket/streams')(io,User,_);
require('./socket/private')(io);

const auth = require('./routes/authRoutes');
const posts = require('./routes/postRoutes');
const users = require('./routes/userRoutes');
const friends = require('./routes/friendsRoutes');
const message = require('./routes/messageRoutes');
const image = require('./routes/imageRoutes');

app.use('/api/chatapp', auth);
app.use('/api/chatapp', posts);
app.use('/api/chatapp',users);
app.use('/api/chatapp',friends);
app.use('/api/chatapp',message);
app.use('/api/chatapp',image);
//
// app.listen(3000, () => {
//     console.log('Running on port 3000')
// });
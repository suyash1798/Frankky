const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://suyash:suyash1798@ds159997.mlab.com:59997/node1',{ useNewUrlParser: true } );

app.listen(3000, () => {
    console.log('Running on port 3000')
});
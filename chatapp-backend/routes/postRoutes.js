/*
* Created By Suyash Tiwari
* on 2 Sept 2018
*/

const express = require('express');
const router = express.Router();

const PostCtrl = require('../controllers/posts');

router.post('/post/add-post', PostCtrl.AddPost);



module.exports = router;
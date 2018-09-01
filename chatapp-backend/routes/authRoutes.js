/*
* Created By Suyash Tiwari
* on 5 August 2018
*/

const express = require('express');
const router = express.Router();

const AuthCtrl = require('../controllers/auth');

router.post('/register', AuthCtrl.CreateUser);
router.post('/login',AuthCtrl.LoginUser);


module.exports = router;
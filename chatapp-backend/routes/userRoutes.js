const express = require('express');

const router = express.Router();

const UserCtrl = require('../controllers/users');
const AuthHelper = require('../Helpers/AuthHelper');

router.get('/users', AuthHelper.verifyToken, UserCtrl.GetAllUsers);
router.get('/user/:username',AuthHelper.verifyToken,UserCtrl.GetUser);

module.exports = router;
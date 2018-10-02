const express = require('express');

const router = express.Router();

const UserCtrl = require('../controllers/users');
const AuthHelper = require('../Helpers/AuthHelper');

router.get('/users', AuthHelper.verifyToken, UserCtrl.GetAllUsers);
router.get('/user/:id',AuthHelper.verifyToken,UserCtrl.GetUser);
router.get('/username/:username', AuthHelper.verifyToken, UserCtrl.GetUserByName);

module.exports = router;
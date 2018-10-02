const express = require('express');

const router = express.Router();

const UserCtrl = require('../controllers/users');
const AuthHelper = require('../Helpers/AuthHelper');

router.get('/users', AuthHelper.verifyToken, UserCtrl.GetAllUsers);
router.get('/user/:id',AuthHelper.verifyToken,UserCtrl.GetUser);
router.get('/username/:username', AuthHelper.verifyToken, UserCtrl.GetUserByName);
router.post('/user/view-profile', AuthHelper.verifyToken, UserCtrl.ProfileView);

module.exports = router;
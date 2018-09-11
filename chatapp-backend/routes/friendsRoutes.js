const express = require('express');

const router = express.Router();

const FriendCtrl = require('../controllers/friends');
const AuthHelper = require('../Helpers/AuthHelper');

router.post('/follow-user', AuthHelper.verifyToken, FriendCtrl.FollowUser);
router.post('/unfollow-user',AuthHelper.verifyToken,FriendCtrl.UnFollowUser);

module.exports = router;
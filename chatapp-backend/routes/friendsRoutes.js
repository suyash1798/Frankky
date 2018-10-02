const express = require('express');

const router = express.Router();

const FriendCtrl = require('../controllers/friends');
const AuthHelper = require('../Helpers/AuthHelper');

router.post('/follow-user', AuthHelper.verifyToken, FriendCtrl.FollowUser);
router.post('/unfollow-user',AuthHelper.verifyToken,FriendCtrl.UnFollowUser);
router.post('/mark/:id',AuthHelper.verifyToken,FriendCtrl.MarkNotification);
router.post('/mark-all',AuthHelper.verifyToken,FriendCtrl.MarkAllNotifications);

module.exports = router;
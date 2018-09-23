const express = require('express');

const router = express.Router();

const MessageCtrl = require('../controllers/message');
const AuthHelper = require('../Helpers/AuthHelper');

router.post(
  '/chat-message/:sender_Id/:receiver_Id',
  AuthHelper.verifyToken,(req,res,next)=>{
      console.log("it works");
      next();
    },
  MessageCtrl.SendMessage
);

module.exports = router;
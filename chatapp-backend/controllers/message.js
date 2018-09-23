const HttpStatus = require('http-status-codes');

const Message = require('../models/messageModels');
const Conversation = require('../models/conversationModels');
const User = require('../models/userModels');

module.exports = {
  SendMessage(req,res){
      console.log('got');
    const { sender_Id, receiver_Id } = req.params;
    Conversation.findOne({
        $or:[
            {
              participants:{
                $elemMatch:{senderId:sender_Id,receiverId:receiver_Id}
              }
            },
            {
              participants:{
                $elemMatch:{senderId:receiver_Id,receiverId:sender_Id}
              }
            }
        ]
    },async(err,result)=>{
      if(result){
        if(result.length > 0)
        console.log('got it');
      }else{
        const newConversation = new Conversation();
        newConversation.participants.push({
            senderId:req.user._id,
            receiverId:req.params.receiver_Id
        });

        const saveConversation = await newConversation.save();

        const newMessage = new Message();
        newMessage.conversationId = saveConversation._id;
        newMessage.sender
      }
    })
  }
};
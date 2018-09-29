const HttpStatus = require('http-status-codes');

const Message = require('../models/messageModels');
const Conversation = require('../models/conversationModels');
const User = require('../models/userModels');
const Helper = require('../Helpers/helpers');

module.exports = {
    async GetAllMessages(req,res){
        const {sender_Id, receiver_Id } = req.params;
        const conversation = await Conversation.findOne({
            $or:[
                {
                    $and:[{'participants.senderId':sender_Id},{'participants.receiverId':receiver_Id}]
                },
                {
                    $and:[{'participants.senderId':receiver_Id},{'participants.receiverId':sender_Id}]
                }
            ]
        });
        console.log('conversation',conversation);
        if(conversation){
            const message = await Message.findOne({
                conversationId:conversation.participants[0]._id
            });
            res
                .status(HttpStatus.OK)
                .json({message:'Messages returned',message});
        }
    },

    SendMessage(req, res) {
        console.log('got',req.body);
        const {sender_Id, receiver_Id} = req.params;
        console.log('params',req.params);
        console.log('sample',sender_Id,receiver_Id);
        Conversation.findOne({
            $or: [
                {
                    participants: {
                        $elemMatch: {senderId: sender_Id, receiverId: receiver_Id}
                    }
                },
                {
                    participants: {
                        $elemMatch: {senderId: receiver_Id, receiverId: sender_Id}
                    }
                }
            ]
        }, async (err, result) => {
            console.log('result',result);
            if(result){
                if (result.participants.length > 0) {
                    await Message.findOne({ conversationId: result.participants[0]._id })
                        .then(res=>{
                            console.log('msg',res);
                            const msg = res;
                            Helper.updateChatList(req,msg);
                        });
                    // console.log('msgpass',msg);
                    await Message.updateOne({
                            conversationId: result.participants[0]._id,
                        },
                        {
                            $push: {
                                message: {
                                    senderId: req.user._id,
                                    receiverId: req.params.receiver_Id,
                                    sendername: req.user.username,
                                    receivername: req.body.receiverName,
                                    body: req.body.message
                                }
                            }
                        }).then(() =>
                        res
                            .status(HttpStatus.OK)
                            .json({message: 'Message sent successfully'}))
                        .catch(err =>
                            res
                                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .json({message: 'Error occured'}));
                }}else {
                const newConversation = new Conversation();
                newConversation.participants.push({
                    senderId: req.user._id,
                    receiverId: req.params.receiver_Id
                });

                const saveConversation = await newConversation.save();

                const newMessage = new Message();
                newMessage.conversationId = saveConversation.participants[0]._id;
                newMessage.sender = req.user.username;
                newMessage.receiver = req.body.receiverName;
                newMessage.message.push({
                    senderId: req.user._id,
                    receiverId: req.params.receiver_Id,
                    sendername: req.user.username,
                    receivername: req.body.receiverName,
                    body: req.body.message
                });
                console.log('user_id',req.user._id);
                await User.updateOne({
                    _id:req.user._id
                },{
                    $push:{
                        chatList:{
                            $each:[
                {
                    receiverId:req.params.receiver_Id,
                        msgId:newMessage._id
                }
                            ],
                            $position:0
                        }
                    }
                });
                await User.updateOne({
                    _id:req.params.receiver_id
                },{
                    $push:{
                        chatList:{
                            $each:[
                                {
                                    receiverId:req.user._id,
                                    msgId:newMessage._id
                                }
                            ],
                            $position:0
                        }
                    }
                });
                await newMessage
                    .save()
                    .then(()=>res.status(HttpStatus.OK).json({message:'Message sent'}))
                    .catch(err=>{
                        console.log('error',err);
                        res
                            .status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .json({message:'Error occured'})}
                    );
            }
        })
    },

    async MarkReceiverMessages(req,res){
        const { sender, receiver } = req.params;
        const msg = await Message.aggregate([
            {$unwind:'$message'},
            {
                $match:{
                    $and:[
                        {'message.sendername':receiver,'message.receivername':sender}
                    ]
                }
            }
        ]);

        if( msg.length > 0){
            try{
                msg.forEach(async (value)=>{
                    await Message.update({
                        'message._id':value.message._id
                    },
                        {
                            $set:{'message.$.isRead':true}
                        });
                });
                res.status(HttpStatus.OK).json({message:'Message maked as read'});
            }catch (err){
                res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({message:'Error occured'});
            }
        }
    },
    async MarkAllMessages(req,res){
        const { sender, receiver } = req.params;
        const msg = await Message.aggregate([
            {$match: {'message.receivername':req.user.username}},
            {$unwind: '$message'},
            {$match:{'message.receivername':req.user.username}},
        ]);

        console.log(msg);

        if( msg.length > 0){
            try{
                msg.forEach(async (value)=>{
                    await Message.update({
                            'message._id':value.message._id
                        },
                        {
                            $set:{'message.$.isRead':true}
                        });
                });
                res.status(HttpStatus.OK).json({message:'Message maked as read'});
            }catch (err){
                res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({message:'Error occured'});
            }
        }
    }
};
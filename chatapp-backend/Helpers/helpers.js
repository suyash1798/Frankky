/*
* Created By Suyash Tiwari
* on 5 August 2018
*/
const User = require('../models/userModels');

module.exports = {
    firstUpper: username => {
        const name = username.toLowerCase();
        return name.charAt(0).toUpperCase() + name.slice(1);
    },

    lowerCase: str => {
        return str.toLowerCase();
    },

    updateChatList: async (req, val) => {
        console.log('val',val);
        await User.updateOne({
                _id: req.user._id
            }, {
                $pull: {
                    chatList: {
                        receiverId: req.params.receiver_Id
                    }
                }
            }
        );

        await User.update(
            {
                _id: req.params.receiver_Id
            },
            {
                $pull: {
                    chatList: {
                        receiverId: req.user._id
                    }
                }
            }
        );


        await User.updateOne({
            _id: req.user._id
        }, {
            $push: {
                chatList: {
                    $each: [
                        {
                            receiverId: req.params.receiver_Id,
                            msgId: val._id
                        }
                    ],
                    $position: 0
                }
            }
        });
        await User.updateOne({
                _id: req.params.receiver_id
            }, {
                $push: {
                    chatList: {
                        $each: [
                            {
                                receiverId: req.user._id,
                                msgId: val._id
                            }
                        ],
                        $position: 0,
                    }
                }
            }
        );
    }
}
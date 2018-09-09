const HttpStatus = require('http-status-codes');

const User = require('../models/userModels');

module.exports = {
  FollowUser(req,res){
    const followUser = async () =>{
        await User.update(
            {
                _id:req.user._id,
                'following.userFollowed': {$ne:req.body.userFollowed}
            },
            {
                $push:{
                    following:{
                        userFollowed:req.body.userFollowed
                    }
                }
            }
        );

        await User.update(
            {
                _id:req.body.userFollowed,
                'following.follower':{$ne:req.user._id}
            },
            {
                $push:{
                    following:{
                        follower:req.body._id
                    }
                }
            }
        )
    };

    followUser()
        .then(()=>{
            res.status(HttpStatus.OK).json({message:'Following user now'})
        })
        .catch(err=>{
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:'Error occured'});
        });
  }
};
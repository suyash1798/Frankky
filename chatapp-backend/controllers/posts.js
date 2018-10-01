const Joi = require('joi');
const HttpStatus = require('http-status-codes');
const cloudinary = require('cloudinary');

const Post = require('../models/postModels');
const User = require('../models/userModels');


cloudinary.config({
    cloud_name: 'dkgxgbhug',
    api_key: '443575422824462',
    api_secret: 'NgvtN7p67aKUtmo-6cFoHq-qlM8'
});

module.exports = {
    AddPost(req, res) {
        const schema = Joi.object().keys({
            post: Joi.string().required()
        });
        const body = {
            post: req.body.post
        };
        const {error} = Joi.validate(body, schema);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json({msg: error.details});
        }

        const bodyObj = {
            user: req.user._id,
            username: req.user.username,
            post: req.body.post,
            created: new Date()
        };

        if(req.body.post && !req.body.image){
            Post.create(bodyObj).then(async (post) => {
                console.log('post with id', post.user._id);
                await User.findOneAndUpdate({_id: req.user._id}, {
                        "$push": {
                            "posts": {
                                "postId": post._id,
                                "post": req.body.post,
                                "created": new Date()
                            }
                        }
                    }, (err, doc) => {

                    }
                )
                ;
                res.status(HttpStatus.OK).json({message: 'Post created', post});
            })
                .catch(err => {

                    res
                        .status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .json({message: 'Error occured'});
                });
        }
        if(req.body.post && req.body.image){
            cloudinary.uploader.upload(req.body.image, async result => {
                console.log('posts save',result);
                const reqBody = {
                    user: req.user._id,
                    username: req.user.username,
                    post: req.body.post,
                    imgId: result.public_id,
                    imgVersion: result.version,
                    created: new Date()
                };
                Post.create(reqBody)
                    .then(async post => {
                        await User.update(
                            {
                                _id: req.user._id
                            },
                            {
                                "$push": {
                                    "posts": {
                                        "postId": post._id,
                                        "post": req.body.post,
                                        "created": new Date()
                                    }
                                }
                            }
                        );
                        res.status(HttpStatus.OK).json({ message: 'Post created', post });
                    })
                    .catch(err => {
                        console.log('error to image',err);
                        res
                            .status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .json({ message: 'Error occured' });
                    });
            });
        }
    },
    async GetAllPosts(req, res) {
        try {
            const posts = await Post.find({})
                .populate('user')
                .sort({createdAt: -1});

            const top = await Post.find({totallikes: {$gte: 1}})
                .populate('user')
                .sort({created: -1});

            return res.status(HttpStatus.OK).json({message: 'All posts', posts, top})
        } catch (err) {
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({message: 'Error occured'});
        }
    },

    async AddLike(req, res) {
        const postId = req.body._id;
        await Post.update({
                _id: postId,
                'likes.username': {$ne: req.user.username}
            }, {
                $push: {
                    likes: {
                        username: req.user.username
                    }
                },
                $inc: {totallikes: 1}
            }
        )
            .then(() => {
                res.status(HttpStatus.OK).json({message: 'You liked the post'});
            })
            .catch(err => {
                res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({message: 'Error occured'});
            });
    },
    async AddComment(req, res) {
        const postId = req.body.postId;
        await Post.update({
                _id: postId
            }, {
                $push: {
                    comments: {
                        userId: req.user._id,
                        username: req.user.username,
                        comment: req.body.comment,
                        createdAt: new Date()
                    }
                },
                $inc: {totallikes: 1}
            }
        )
            .then(() => {
                res.status(HttpStatus.OK).json({message: 'Comment added to post'});
            })
            .catch(err => {
                res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({message: 'Error occured'});
            });
    },
    async GetPost(req, res) {
        await Post.findOne({_id: req.params.id})
            .populate('user')
            .populate('comments.userId')
            .then(post => {
                res.status(HttpStatus.OK).json({message: 'Post found', post})
            })
            .catch(err => res
                .status(HttpStatus.NOT_FOUND)
                .json({message: 'Post not found', post})
            );
    }
};
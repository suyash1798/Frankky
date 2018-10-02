const cloudinary = require('cloudinary');
const HttpStatus = require('http-status-codes');

const User = require('../models/userModels');

cloudinary.config({
    cloud_name: 'dkgxgbhug',
    api_key: '443575422824462',
    api_secret: 'NgvtN7p67aKUtmo-6cFoHq-qlM8'
});

module.exports = {
    UploadImage(req, res) {
        cloudinary.uploader.upload(req.body.image, async result => {
            await User.update(
                {
                    _id: req.user._id
                },
                {
                    $push: {
                        images: {
                            imgId: result.public_id,
                            imgVersion: result.version
                        }
                    }
                }
            )
                .then(() => {
                        console.log('Uploaded Completed');
                        res
                            .status(HttpStatus.OK)
                            .json({message: 'Image uploaded successfully'})
                    }
                )
                .catch(err =>
                    res
                        .status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .json({ message: 'Error uploading image' })
                );
        });
    },

    async SetDefaultImage(req, res) {
        const { imgId, imgVersion } = req.params;

        await User.update(
            {
                _id: req.user._id
            },
            {
                picId: imgId,
                picVersion: imgVersion
            }
        )
            .then(() =>
                res.status(HttpStatus.OK).json({ message: 'Default image set' })
            )
            .catch(err =>
                res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: 'Error occured' })
            );
    }
};
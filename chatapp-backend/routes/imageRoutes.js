const express = require('express');

const router = express.Router();

const ImageCtrl = require('../controllers/images');
const AuthHelper = require('../Helpers/AuthHelper');

router.get(
    '/set-default-image/:imgId/:imgVersion',
    AuthHelper.verifyToken,
    ImageCtrl.SetDefaultImage
);
router.post('/upload-image', AuthHelper.verifyToken, ImageCtrl.UploadImage);

module.exports = router;
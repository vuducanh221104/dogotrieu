const express = require('express');
const router = express.Router();

const cloudinary = require('../Config/cloudinary/cloudinary');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
// TEST

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        // folder: 'image-home',
        allowedFormats: ['jpg', 'png', 'jpeg'],
        // VALUES WHEN UPLOAD IMAGE MAX-WIDTH & MAX-HEIGHT
        transformation: [],
    },
});
const upload = multer({
    storage: storage,
});

router.post('/', upload.array('img', 20), async (req, res) => {
    const data = req.files;
    res.send(data);
});

module.exports = router;

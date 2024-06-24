const express = require('express');
const router = express.Router();
const User = require('../Models/Users');
const userController = require('../Controllers/UserController');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../Config/cloudinary/cloudinary');
const multer = require('multer');

// upload Avatar
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'avatar-user',
    allowedFormats: ['jpg', 'png', 'jpeg'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
});
const upload = multer({
    storage: storage,
});
router.post('/', upload.fields([{ name: 'img', maxCount: 1, folder: 'avatar-user' }]), async (req, res) => {
    const data = req.files['img'][0];
    const userId = req.body._id;
    // Handle Change Avatar
    const user = await User.findById(userId);
    user.avatar = data.path;
    try {
        await user.save();
        res.status(200).json(data.path);
    } catch (error) {
        console.error('Lỗi khi lưu trữ avatar:', error);
        res.status(500).json({ error: 'Lỗi khi lưu trữ avatar' });
    }
});

const express = require('express');
const router = express.Router();

const cloudinary = require('../Config/cloudinary/cloudinary');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
// TEST
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        allowedFormats: ['jpg', 'png', 'jpeg', 'webp'],
        transformation: [
            { quality: 'auto:good' }, // Tự động tối ưu chất lượng
            { fetch_format: 'auto' }, // Tự động chọn định dạng tốt nhất (webp nếu trình duyệt hỗ trợ)
            { strip: true },
        ],
    },
});
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // Giới hạn 10MB cho mỗi file
    },
});

router.post('/', upload.array('img', 20), async (req, res) => {
    try {
        const data = req.files;
        res.send(data);
    } catch (error) {
        res.status(500).json({ message: 'Error uploading files', error: error.message });
    }
});

module.exports = router;

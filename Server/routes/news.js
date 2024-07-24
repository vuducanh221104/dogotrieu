const express = require('express');
const router = express.Router();
const NewsController = require('../controllers/NewsController');

router.get('/all', NewsController.newsGetAllLimit);
router.get('/featuredNews', NewsController.newsFeaturedGet);
router.get('/:id', NewsController.newsGetById);
router.patch('/:id', NewsController.newsUpdate);
router.delete('/:id', NewsController.newsDelete);
router.get('/', NewsController.newsGetAll);
router.post('/', NewsController.newsPost);

module.exports = router;

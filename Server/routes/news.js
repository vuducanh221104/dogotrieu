const express = require('express');
const router = express.Router();
const NewsController = require('../Controllers/NewsController');

router.get('/tagged/:slug', NewsController.newsGetTagged);
router.get('/featuredNews', NewsController.newsFeaturedGet);
router.get('/siteMap', NewsController.getNewsSITEMAP);
router.get('/:id', NewsController.newsGetById);
router.patch('/:id', NewsController.newsUpdate);
router.delete('/:id', NewsController.newsDelete);
router.get('/', NewsController.newsGetAll);
router.post('/', NewsController.newsPost);

module.exports = router;

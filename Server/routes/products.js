const express = require('express');
const router = express.Router();
const productController = require('../Controllers/ProductController');

router.get('/search', productController.seachProductWithQ);
router.get('/search-all', productController.searchProduct);
router.get('/', productController.products);
router.get('/:slug', productController.slugProducts);
router.get('/related/:classify', productController.relatedProduct);

module.exports = router;

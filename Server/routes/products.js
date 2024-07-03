const express = require('express');
const router = express.Router();
const ProductController = require('../Controllers/ProductController');
//
router.get('/search', ProductController.searchProductByQueryAndFilter);
router.get('/searchQuery', ProductController.seachProductByQuery);
router.get('/only', ProductController.getOnlyProduct);
router.get('/list', ProductController.getAllProduct);
router.get('/type/:id', ProductController.getProductAndProductType);
router.get('/category/featured/byId', ProductController.fearProductById);
router.get('/category/featured/byCate', ProductController.feaProductByCategory);
router.delete('/', ProductController.deleteProduct);
router.post('/', ProductController.addProductWithType);
router.patch('/:id', ProductController.editProduct);

module.exports = router;

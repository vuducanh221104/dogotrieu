const express = require('express');
const router = express.Router();
const CategoryController = require('../Controllers/CategoryController');

router.get('/:slug', CategoryController.categoryAndQueryMaterial);
router.get('/seo/:slug', CategoryController.categorySeo);
router.get('/', CategoryController.categoryList);
router.post('/', CategoryController.categoryAdd);
router.patch('/', CategoryController.categoryUpdate);
router.delete('/', CategoryController.categoryDelete);
//Get To Slug And Query Material

module.exports = router;

const express = require('express');
const router = express.Router();
const CategoryController = require('../Controllers/CategoryController');

router.get('/', CategoryController.categoryList);
router.post('/', CategoryController.categoryAdd);
//Get To Slug And Query Material
router.get('/:slug', CategoryController.categoryAndQueryMaterial);

module.exports = router;

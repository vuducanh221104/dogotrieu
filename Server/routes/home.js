const express = require('express');
const router = express.Router();
const HomeController = require('../Controllers/HomeController');

router.patch('/featProduct/:id', HomeController.homePatchFeatProduct);
router.delete('/featProduct/:id', HomeController.homeDeleteFeatProduct);
router.get('/', HomeController.homeGet);
router.patch('/', HomeController.homePatch);
router.post('/', HomeController.homePost);

module.exports = router;

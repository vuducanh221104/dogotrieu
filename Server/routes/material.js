const express = require('express');
const router = express.Router();
const MaterialController = require('../Controllers/MaterialController');

router.get('/', MaterialController.materialGet);

router.post('/', MaterialController.materialAdd);

module.exports = router;

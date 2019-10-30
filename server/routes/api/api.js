const express = require('express');
const router = express.Router();

const pageController = require('../../controllers/pageController');

router.get('/page-data', pageController.page_data_api);

module.exports = router;

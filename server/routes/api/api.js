const express = require('express');
const router = express.Router();

const pageController = require('../../controllers/pageController');

router.get('/page-data/:slug', pageController.page_data_api);

module.exports = router;

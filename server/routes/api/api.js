const express = require('express');
const router = express.Router();

const pageController = require('../../controllers/pageController');

router.get('/page-data/:slug', pageController.page_data_api);
router.get('/page-menu', pageController.page_menu_api);

module.exports = router;

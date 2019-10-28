const express = require('express');
const router = express.Router();

const page_controller = require('../../controllers/pageController');

router.get('/page-data', page_controller.page_data_api);

module.exports = router;

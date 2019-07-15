const express = require('express');
const router = express.Router();

const page_controller = require('../../controllers/pageController');

router.all('*', (req, res, next) => {
  if (!req.session.user) {
    res.status('404').end();

    return;
  }

  next();
});

router.get('/pages', page_controller.page_list_api);

module.exports = router;

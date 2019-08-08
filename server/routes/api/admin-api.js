const express = require('express');
const router = express.Router();

const page_controller = require('../../controllers/pageController');
const user_controller = require('../../controllers/userController');

router.all('*', (req, res, next) => {
  if (!req.session.user) {
    res.status('401').end();

    return;
  }

  next();
});

router.get('/pages', page_controller.page_list_api);
router.post('/page', page_controller.page_create_post_api);

router.get('/users', user_controller.user_list_api);

module.exports = router;

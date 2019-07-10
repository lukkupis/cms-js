const express = require('express');
const app = require('../nextApp');
const router = express.Router();

const page_controller = require('../controllers/pageController');

router.all('*', (req, res, next) => {
  if (!req.session.admin) {
    res.redirect('login');

    return;
  }

  next();
});

router.get('/', page_controller.page_list);

router.post('/page-form', page_controller.page_create_post);

module.exports = router;

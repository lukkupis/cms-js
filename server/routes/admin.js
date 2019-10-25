const express = require('express');
const router = express.Router();
const app = require('../nextApp');

const page_controller = require('../controllers/pageController');
const user_controller = require('../controllers/userController');

router.all('*', (req, res, next) => {
  if (!req.session.user) {
    res.redirect('/login');

    return;
  }

  next();
});

router.get('/', (req, res) => {
  res.redirect('/admin/pages');
});

router.get('/pages', page_controller.page_list);
router.get('/pages/page-new', page_controller.page_detail);

router.get('/users', user_controller.user_list);

module.exports = router;

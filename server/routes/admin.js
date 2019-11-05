const express = require('express');
const router = express.Router();

const pageCmsController = require('../controllers/pageCmsController');
const userCmsController = require('../controllers/userCmsController');
const menuCmsController = require('../controllers/menuCmsController');

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

router.get('/pages', pageCmsController.page_list);
router.get('/pages/page', pageCmsController.page_detail);

router.get('/users', userCmsController.user_list);
router.get('/users/user', userCmsController.user_detail);

router.get('/menu', menuCmsController.menu_list);

module.exports = router;

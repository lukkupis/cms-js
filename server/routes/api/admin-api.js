const express = require('express');
const router = express.Router();

const pageCmsController = require('../../controllers/pageCmsController');
const userCmsController = require('../../controllers/userCmsController');
const menuCmsController = require('../../controllers/menuCmsController');

router.all('*', (req, res, next) => {
  if (!req.session.user) {
    res.status('401').end();

    return;
  }

  next();
});

router.get('/pages', pageCmsController.page_list_api);
router.get('/page/:id', pageCmsController.page_detail_api);
router.post('/page', pageCmsController.page_create_api);
router.put('/page/:id', pageCmsController.page_update_api);
router.delete('/page/:id', pageCmsController.page_delete_api);

router.get('/users', userCmsController.user_list_api);
router.get('/user/:id', userCmsController.user_detail_api);
router.post('/user', userCmsController.user_create_api);
router.put('/user/:id', userCmsController.user_update_api);
router.delete('/user/:id', userCmsController.user_delete_api);

router.get('/menu', menuCmsController.menu_list_api);
router.post('/menu', menuCmsController.menu_insert_api);

module.exports = router;

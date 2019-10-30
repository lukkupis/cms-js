const express = require('express');
const router = express.Router();

const pageCmsController = require('../../controllers/pageCmsController');
const userCmsController = require('../../controllers/userCmsController');

router.all('*', (req, res, next) => {
  if (!req.session.user) {
    res.status('401').end();

    return;
  }

  next();
});

router.get('/pages', pageCmsController.page_list_api);
router.get('/page', pageCmsController.page_detail_api);
router.post('/page', pageCmsController.page_create_api);
router.put('/page', pageCmsController.page_update_api);
router.delete('/page', pageCmsController.page_delete_api);

router.get('/users', userCmsController.user_list_api);
router.get('/user', userCmsController.user_detail_api);
router.post('/user', userCmsController.user_create_api);
router.put('/user', userCmsController.user_update_api);
router.delete('/user', userCmsController.user_delete_api);

module.exports = router;

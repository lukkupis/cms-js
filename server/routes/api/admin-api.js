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
router.get('/page', page_controller.page_detail_api);
router.post('/page', page_controller.page_create_api);
router.put('/page', page_controller.page_update_api);
router.delete('/page', page_controller.page_delete_api);

router.get('/page-data', page_controller.page_data_api);

router.get('/users', user_controller.user_list_api);

module.exports = router;

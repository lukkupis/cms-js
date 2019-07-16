const express = require('express');
const app = require('../nextApp');
const router = express.Router();

const user_controller = require('../controllers/userController');

/* GET home page. */
router.get('/', (req, res) => {
  return app.render(req, res, '/index', req.query);
});

router.get('/login', (req, res) => {
  if (req.session.user) {
    res.redirect('/admin');
  } else {
    return app.render(req, res, '/login', req.query);
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

router.post('/login', user_controller.user_login);

module.exports = router;

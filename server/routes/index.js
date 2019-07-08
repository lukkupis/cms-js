const express = require('express');
const app = require('../nextApp');
const router = express.Router();

const config = require('../config');

/* GET home page. */
router.get('/', (req, res) => {
  return app.render(req, res, '/index', req.query);
});

router.get('/login', (req, res) => {
  return app.render(req, res, '/login', req.query);
});

router.post('/login', (req, res) => {
  const body = req.body;

  if (body.login === config.login && body.password === config.password) {
    req.session.admin = 1;

    res.redirect('/admin');
  } else {
    res.redirect('/login?valid=error');
  }
});

module.exports = router;

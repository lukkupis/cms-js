const express = require('express');
const app = require('../nextApp');
const router = express.Router();

router.all('*', (req, res, next) => {
  if (!req.session.admin) {
    res.redirect('login');

    return;
  }

  next();
});

router.all('/', (req, res, next) => {
  return app.render(req, res, '/admin', req.query);
});

module.exports = router;

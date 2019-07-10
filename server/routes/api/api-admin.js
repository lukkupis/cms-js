const express = require('express');
const router = express.Router();

router.all('*', (req, res, next) => {
  if (!req.session.admin) {
    return;
  }

  next();
});

router.all('/pages', (req, res, next) => {
  const data = {
    id: 0,
    name: 'testowa'
  };

  res.json(data);
});

module.exports = router;

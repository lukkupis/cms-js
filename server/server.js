const express = require('express');
const app = require('./nextApp');

const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('./config');
const mongoose = require('mongoose');

mongoose.connect(config.db, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const port = parseInt(process.env.PORT, 10) || 3000;
const handle = app.getRequestHandler();

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
// const apiRouter = require('./routes/api');

app.prepare().then(() => {
  const server = express();

  server.use(logger('dev'));
  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));
  server.use(cookieParser());
  server.use(
    cookieSession({
      name: 'session',
      keys: config.keySession,
      maxAge: config.maxAgeSession
    })
  );

  server.use(function(req, res, next) {
    res.locals.path = req.path;

    next();
  });

  server.use('/', indexRouter);
  server.use('/admin', adminRouter);
  // server.use('/api', apiRouter);

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});

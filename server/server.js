const express = require('express');
const app = require('./nextApp');
const path = require('path');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('./config');
const mongoose = require('mongoose');

const pageController = require('./controllers/pageController');

mongoose.connect(config.db, { useNewUrlParser: true, useFindAndModify: false });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const port = parseInt(process.env.PORT, 10) || 3000;
const handle = app.getRequestHandler();

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const adminApiRouter = require('./routes/api/admin-api');
const apiRouter = require('./routes/api/api');

app.prepare().then(() => {
  const server = express();

  server.use(logger('dev'));
  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));
  server.use(cookieParser());
  server.use(
    session({
      name: 'cmsjs.sid',
      secret: config.keySession,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: config.maxAgeSession
      },
      store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
  );

  server.use(function(req, res, next) {
    res.locals.path = req.path;

    if (config.demoMode) {
      res.cookie('demoMode', config.demoMode);
    }

    next();
  });

  server.use(pageController.page_menu);

  server.use('/admin', adminRouter);
  server.use('/admin-api', adminApiRouter);
  server.use('/api', apiRouter);
  server.use('/', indexRouter);

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});

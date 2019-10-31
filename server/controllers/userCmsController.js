const User = require('../models/User');
const app = require('../nextApp');
const bcrypt = require('bcrypt');

// Login user.
exports.user_login = (req, res) => {
  const { login, password } = req.body;

  User.find({ permissions: 'admin' }, (err, data) => {
    if (data.length) {
      User.findOne({ login }, (err, data) => {
        bcrypt.compare(password, data.password, function(err, passCorrect) {
          if (!data) {
            res.redirect('/login?valid=error');
          } else if (!passCorrect) {
            res.redirect('/login?valid=error');
          } else {
            const { _id, name, login, permissions } = data;

            req.session.user = { id: _id, name, login, permissions };
            res.redirect('/admin');
          }
        });
      });
    } else if (login === 'admin' && password === 'admin') {
      req.session.user = {
        id: 0,
        name: 'Admin',
        login: 'admin',
        permissions: 'admin'
      };
      res.redirect('/admin/users');
    } else {
      res.redirect('/login?valid=error');
    }
  });
};

// Display list of all users.
exports.user_list = (req, res) => {
  User.find({})
    .select('-password')
    .exec({}, (err, data) => {
      app.render(req, res, '/admin/users', { data });
    });
};

exports.user_list_api = (req, res) => {
  User.find({})
    .select('-password')
    .exec({}, (err, data) => {
      res.json(data);
    });
};

// Display detail user for a specific user.
exports.user_detail = (req, res) => {
  User.findById(req.query.id)
    .select('-password')
    .exec({}, (err, data) => {
      let newData = { ...data._doc };
      newData.password = '';
      newData.confirmPassword = '';

      app.render(req, res, '/admin/user', { newData });
    });
};

exports.user_detail_api = (req, res) => {
  User.findById(req.query.id)
    .select('-password')
    .exec({}, (err, data) => {
      let newData = { ...data._doc };
      newData.password = '';
      newData.confirmPassword = '';

      res.json(newData);
    });
};

// Handle user create
exports.user_create_api = async (req, res) => {
  const body = req.body;

  const userData = new User(body);
  const errors = userData.validateSync();

  if (body.password === body.confirmPassword) {
    bcrypt.hash(body.password, 10, function(err, hash) {
      body.password = hash;

      User.init().then(() => {
        userData.save((err, newUser) => {
          if (err) {
            res.json(errors || err);
            return;
          }

          newUser.password = '';
          newUser.confirmPassword = '';

          res.json({
            message: 'User added.',
            name: 'added',
            newUser
          });
        });
      });
    });
  } else {
    res.json({ error: 'Passwords are not the same' });
  }
};

exports.user_update_api = async (req, res) => {
  const body = req.body;

  User.findById(body._id, (err, user) => {
    if (body.password === body.confirmPassword) {
      bcrypt.hash(body.password, 10, function(err, hash) {
        if (body.password.length !== 0 && body.password.length >= 6) {
          user.password = hash;
        } else if (body.password.length !== 0 && body.password.length < 6) {
          return res.json({ error: 'Passwords must be at least 6 characters' });
        }

        user.name = body.name;
        user.login = body.login;
        user.email = body.email;
        user.permissions = body.permissions;

        user.save((err, user) => {
          if (err) {
            res.json(errors || err);
            return;
          }

          let newUser = { ...user._doc };
          newUser.password = '';
          newUser.confirmPassword = '';

          res.json({
            message: 'User edited.',
            name: 'edited',
            newUser
          });
        });
      });
    } else if (body.password !== body.confirmPassword) {
      res.json({ error: 'Passwords are not the same' });
    } else {
      res.json({ error: 'Error saving' });
    }
  });
};

exports.user_delete_api = async (req, res) => {
  const id = req.query.id;

  //block delete last admin

  User.findByIdAndDelete(id, (err, doc) => {
    if (err || !doc) {
      res.status(404);
      return;
    }
    res.json({ id, name: 'deleted' });
  });
};

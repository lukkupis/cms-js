const User = require('../models/User');
const app = require('../nextApp');
const bcrypt = require('bcrypt');

// Login user.
exports.user_login = (req, res) => {
  const { login, password } = req.body;

  User.find({ permissions: 'admin' }, (err, data) => {
    if (data && data.length) {
      User.findOne({ login }, (err, data) => {
        if (data) {
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
        } else {
          res.redirect('/login?valid=error');
        }
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
  if (req.session.user.permissions === 'admin') {
    User.find({})
      .select('-password')
      .exec({}, (err, data) => {
        app.render(req, res, '/admin/users', { data });
      });
  } else {
    app.render(req, res, '/page-error', 'No permission.');
  }
};

exports.user_list_api = (req, res) => {
  if (req.session.user.permissions === 'admin') {
    User.find({})
      .select('-password')
      .exec({}, (err, data) => {
        res.json(data);
      });
  } else {
    res.json({ error: 'No permission;' });
  }
};

// Display detail user for a specific user.
exports.user_detail = (req, res) => {
  if (req.session.user.permissions === 'admin') {
    User.findById(req.query.id)
      .select('-password')
      .exec({}, (err, data) => {
        app.render(req, res, '/admin/user', {
          ...data._doc,
          password: '',
          confirmPassword: ''
        });
      });
  } else {
    app.render(req, res, '/page-error', 'No permission.');
  }
};

exports.user_detail_api = (req, res) => {
  if (req.session.user.permissions === 'admin') {
    User.findById(req.params.id)
      .select('-password')
      .exec({}, (err, data) => {
        res.json({ ...data._doc, password: '', confirmPassword: '' });
      });
  } else {
    res.json({ error: 'No permission;' });
  }
};

// Handle user create
exports.user_create_api = async (req, res) => {
  if (req.session.user.permissions === 'admin') {
    const body = req.body;

    const userData = new User(body);
    const errors = userData.validateSync();

    if (body.password === body.confirmPassword) {
      bcrypt.hash(body.password, 10, function(err, hash) {
        if (body.password.length !== 0 && body.password.length >= 6) {
          userData.password = hash;
        } else if (body.password.length !== 0 && body.password.length < 6) {
          return res.json({
            error: 'Passwords must be at least 6 characters'
          });
        }

        User.init().then(() => {
          userData.save((err, newUser) => {
            if (err) {
              res.json(errors || err);
              return;
            }

            res.json({
              message: 'User added.',
              name: 'added',
              newUser: {
                ...newUser._doc,
                password: '',
                confirmPassword: ''
              }
            });
          });
        });
      });
    } else if (body.password !== body.confirmPassword) {
      res.json({ error: 'Passwords are not the same' });
    } else {
      res.json({ error: 'Error saving' });
    }
  } else {
    res.json({ error: 'No permission;' });
  }
};

exports.user_update_api = async (req, res) => {
  if (req.session.user.permissions === 'admin') {
    const body = req.body;

    User.findById(req.params.id, (err, user) => {
      if (body.password === body.confirmPassword) {
        bcrypt.hash(body.password, 10, function(err, hash) {
          if (body.password.length !== 0 && body.password.length >= 6) {
            user.password = hash;
          } else if (body.password.length !== 0 && body.password.length < 6) {
            return res.json({
              error: 'Passwords must be at least 6 characters'
            });
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
  } else {
    res.json({ error: 'No permission;' });
  }
};

exports.user_delete_api = async (req, res) => {
  if (req.session.user.permissions === 'admin') {
    const id = req.params.id;

    User.find({ permissions: 'admin' }, (err, admin) => {
      User.findById(id, (err, user) => {
        if (err || !user) {
          res.status(404);
          return;
        }

        if (user.permissions === 'admin' && admin.length > 1) {
          user.delete(err => {
            if (err) {
              res.status(404);
              return;
            }

            res.json({ id, name: 'deleted' });
          });
        } else if (user.permissions !== 'admin') {
          user.delete(err => {
            if (err) {
              res.status(404);
              return;
            }

            res.json({ id, name: 'deleted' });
          });
        } else {
          res.json({
            id,
            name: 'error',
            message: 'You can not delete the last administrator.'
          });
        }
      });
    });
  } else {
    res.json({ error: 'No permission;' });
  }
};

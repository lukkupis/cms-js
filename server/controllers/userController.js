const User = require('../models/User');
const app = require('../nextApp');

// Login user.
exports.user_login = (req, res) => {
  const { login, password } = req.body;

  User.findOne({ login }, (err, data) => {
    if (!data) {
      res.redirect('/login?valid=error');
    } else if (data.password != password) {
      res.redirect('/login?valid=error');
    } else {
      const { name, login, permissions } = data;

      req.session.user = { name, login, permissions };
      res.redirect('/admin');
    }
  });
};

// Display list of all users.
exports.user_list = (req, res) => {
  User.find({}, (err, data) => {
    app.render(req, res, '/admin/users', { data });
  });
};

exports.user_list_api = (req, res) => {
  User.find({}, (err, data) => {
    res.json(data);
  });
};

// Display detail user for a specific user.
exports.user_detail = (req, res) => {
  res.send('NOT IMPLEMENTED: user detail: ' + req.params.id);
};

// Handle user create on POST.
exports.user_create_post = (req, res) => {
  const body = req.body;

  const userData = new User(body);
  const errors = userData.validateSync();

  userData.save(err => {
    if (err) {
      res.render('admin/user-form', { errors, body });
      return;
    }

    res.redirect('/admin/users');
  });
};

// Display user delete form on GET.
exports.user_delete_get = (req, res) => {
  res.send('NOT IMPLEMENTED: user delete GET');
};

// Handle user update on POST.
exports.user_update_post = (req, res) => {
  res.send('NOT IMPLEMENTED: user update POST');
};

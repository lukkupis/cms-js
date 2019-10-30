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
      const { _id, name, login, permissions } = data;

      req.session.user = { id: _id, name, login, permissions };
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
  User.findById(req.query.id).exec({}, (err, data) => {
    app.render(req, res, '/admin/user', { data });
  });
};

exports.user_detail_api = (req, res) => {
  User.findById(req.query.id).exec({}, (err, data) => {
    res.json(data);
  });
};

// Handle user create
exports.user_create_api = async (req, res) => {
  const body = req.body;

  const userData = new User(body);
  const errors = userData.validateSync();

  //check password

  // User.init().then(() => {
  //   userData.save((err, user) => {
  //     if (err) {
  //       res.json(errors || err);
  //       return;
  //     }
  //     res.json({
  //       message: 'User added.',
  //       name: 'added',
  //       user
  //     });
  //   });
  // });
};

exports.user_update_api = async (req, res) => {
  const body = req.body;

  //check password

  // User.findById(body._id, (err, user) => {
  //   user.save((err, user) => {
  //     if (err) {
  //       res.json(err);
  //       return;
  //     }

  //     res.json({ message: 'User edited.', name: 'edited', newUser });
  //   });
  // });
};

exports.user_delete_api = async (req, res) => {
  const id = req.query.id;

  //block delete last admin

  // User.findByIdAndDelete(id, (err, doc) => {
  //   if (err || !doc) {
  //     res.status(404);
  //     return;
  //   }
  //   res.json({ id, name: 'deleted' });
  // });
};

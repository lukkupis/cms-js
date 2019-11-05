const app = require('../nextApp');

exports.menu_list = (req, res) => {
  app.render(req, res, '/admin/menu');
};

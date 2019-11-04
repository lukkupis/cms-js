const Page = require('../models/Page');
const app = require('../nextApp');

exports.page_data = (req, res) => {
  Page.findOne({ slug: req.params.slug })
    .populate('author', 'name')
    .exec({}, (err, data) => {
      app.render(req, res, '/page', { data });
    });
};

exports.page_data_api = (req, res) => {
  Page.findOne({ slug: req.params.slug })
    .populate('author', 'name')
    .exec({}, (err, data) => {
      res.json(data);
    });
};

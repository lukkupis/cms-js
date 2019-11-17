const Page = require('../models/Page');
const Menu = require('../models/Menu');
const app = require('../nextApp');

exports.page_data = async (req, res) => {
  let data = await Page.findOne({ slug: req.params.slug }).populate(
    'author',
    'name'
  );

  app.render(req, res, '/page', { data });
};

exports.page_data_api = async (req, res) => {
  let data = await Page.findOne({ slug: req.params.slug }).populate(
    'author',
    'name'
  );

  res.json(data);
};

exports.page_menu = async (req, res, next) => {
  const menu = await Menu.find().populate('page');

  req.locals = { ...req.locals, menu };

  next();
};

exports.page_menu_api = (req, res) => {
  Menu.find()
    .populate('page')
    .exec({}, (err, data) => {
      res.json(data);
    });
};

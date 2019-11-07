const app = require('../nextApp');
const Page = require('../models/Page');
const Menu = require('../models/Menu');

exports.menu_list = (req, res) => {
  Page.find()
    .sort('-created')
    .exec({}, (err, pages) => {
      Menu.find()
        .sort('order')
        .populate('page')
        .exec({}, (err, menu) => {
          app.render(req, res, '/admin/menu', { pages, menu });
        });
    });
};

exports.menu_list_api = (req, res) => {
  Page.find()
    .sort('-created')
    .exec({}, (err, pages) => {
      Menu.find()
        .sort('order')
        .populate('page')
        .exec({}, (err, menu) => {
          res.json({ pages, menu });
        });
    });
};

exports.menu_insert_api = (req, res) => {
  const menu = req.body;

  Page.find().exec({}, (err, pages) => {
    const menuPages = menu
      .map((item, key) => {
        const page = pages.find(page => String(page._id) === item);

        if (page) {
          return {
            title: page.title,
            order: key,
            page: page._id
          };
        }
      })
      .filter(item => item !== undefined);

    Menu.deleteMany({}, () =>
      Menu.insertMany(menuPages, (err, menu) => {
        if (err) {
          return res.json(err);
        }

        Menu.find()
          .sort('order')
          .populate('page')
          .exec({}, (err, menu) => {
            res.json(menu);
          });
      })
    );
  });
};

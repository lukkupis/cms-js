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

exports.menu_insert_api = async (req, res) => {
  const menu = req.body;

  const pages = await Page.find();
  const prevMenu = await Menu.find();

  const menuPages = menu
    .map((item, key) => {
      const page = pages.find(page => String(page._id) === item);
      const menuItem = prevMenu.find(prevItem => String(prevItem._id) === item);

      if (page) {
        return {
          title: page.title,
          linkName: page.title,
          path: '/' + page.slug,
          order: key,
          page: page._id
        };
      } else if (menuItem) {
        return {
          title: menuItem.title,
          linkName: menuItem.linkName,
          path: menuItem.path,
          order: key,
          page: menuItem.page._id
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
          res.json({ name: 'inserted', menu });
        });
    })
  );
};

exports.menu_delete_api = (req, res) => {
  const id = req.params.id;

  Menu.findByIdAndDelete(id, (err, doc) => {
    if (err || !doc) {
      res.status(404);
      return;
    }
    res.json({ id, name: 'deleted' });
  });
};

exports.menu_update_api = (req, res) => {
  const id = req.params.id;
  const linkName = req.body.linkName;

  Menu.findById(id, (err, menu) => {
    menu.linkName = linkName;

    menu.save(err => {
      if (err) {
        res.json(err);
        return;
      }

      res.json({ id, linkName, name: 'updated' });
    });
  });
};

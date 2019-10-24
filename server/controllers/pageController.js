const Page = require('../models/Page');
const User = require('../models/User');
const app = require('../nextApp');
const slugify = require('slugify');

function uniquePageSlug(Page, body) {
  return Page.find({ slug: new RegExp(body.slug, 'i') })
    .select('slug')
    .exec()
    .then(data => {
      if (data.length > 0) {
        let index = 2;
        let slugs = [];

        data.forEach(item => {
          slugs.push(item.slug);
        });

        while (slugs.includes(body.slug + '-' + index)) {
          index += 1;
        }

        return body.slug + '-' + index;
      }

      return body.slug;
    });
}

// Display list of all pages.
exports.page_list = (req, res) => {
  Page.find()
    .populate('author')
    .sort('-created')
    .exec({}, (err, data) => {
      app.render(req, res, '/admin/pages', { data });
    });
};

exports.page_list_api = (req, res) => {
  Page.find()
    .populate('author')
    .sort('-created')
    .exec({}, (err, data) => {
      res.json(data);
    });
};

// Display detail page for a specific page.
exports.page_detail = (req, res) => {
  Page.findById(req.query.id)
    .populate('author')
    .exec({}, (err, data) => {
      app.render(req, res, '/admin/page-new', { data });
    });
};

exports.page_detail_api = (req, res) => {
  Page.findById(req.query.id)
    .populate('author')
    .exec({}, (err, data) => {
      res.json(data);
    });
};

// Handle page create
exports.page_create_api = async (req, res) => {
  const body = req.body;

  body.slug = slugify(body.title, {
    replacement: '-',
    remove: null,
    lower: true
  });

  const uniqueSlug = await uniquePageSlug(Page, body);

  body.slug = uniqueSlug;

  const pageData = new Page(body);
  const errors = pageData.validateSync();

  Page.init().then(() => {
    pageData.save((err, page) => {
      if (err) {
        res.json(errors || err);
        return;
      }

      let newPage = JSON.parse(JSON.stringify(page));

      User.findById(page.author, function(err, author) {
        newPage = { ...newPage, author };
        res.json({ message: 'Page published.', name: 'published', newPage });
      });
    });
  });
};

exports.page_update_api = async (req, res) => {
  const body = req.body;

  body.slug = slugify(body.slug, {
    replacement: '-',
    remove: null,
    lower: true
  });

  const uniqueSlug = await uniquePageSlug(Page, body);

  const pageData = new Page(body);
  const errors = pageData.validateSync();

  Page.init().then(() => {
    Page.findById(pageData.id, (err, page) => {
      if (page.slug !== pageData.slug) {
        pageData.slug = uniqueSlug;
      }

      Page.findByIdAndUpdate(pageData.id, pageData, (err, page) => {
        if (err) {
          res.json(errors || err);
          return;
        }

        let newPage = JSON.parse(JSON.stringify(page));

        User.findById(page.author, function(err, author) {
          newPage = { ...newPage, author };
          res.json({ message: 'Page published.', name: 'published', newPage });
        });
      });
    });
  });
};

exports.page_delete_api = async (req, res) => {
  const id = req.query.id;

  Page.findByIdAndDelete(id, (err, doc) => {
    if (err || !doc) {
      res.status(404);
      return;
    }
    res.json({ id, name: 'deleted' });
  });
};

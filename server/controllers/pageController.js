const Page = require('../models/Page');
const app = require('../nextApp');
const slugify = require('slugify');

// Display list of all pages.
exports.page_list = (req, res) => {
  Page.find()
    .populate('author')
    .exec({}, (err, data) => {
      app.render(req, res, '/admin/pages', { data });
    });
};

exports.page_list_api = (req, res) => {
  Page.find()
    .populate('author')
    .exec({}, (err, data) => {
      res.json(data);
    });
};

// Display detail page for a specific page.
exports.page_detail = (req, res) => {
  res.send('NOT IMPLEMENTED: page detail: ' + req.params.id);
};

// Handle page create on POST.
exports.page_create_post_api = async (req, res) => {
  const body = req.body;

  body.slug = slugify(body.title, {
    replacement: '-',
    remove: null,
    lower: true
  });

  const uniqueSlug = await Page.find({ slug: new RegExp(body.slug, 'i') })
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

  body.slug = uniqueSlug;

  const pageData = new Page(body);
  const errors = pageData.validateSync();

  Page.init().then(() => {
    pageData.save(err => {
      if (err) {
        res.json(errors || err);
        return;
      }
      res.json({ message: 'Page published.', name: 'published' });
    });
  });
};

// Display page delete form on GET.
exports.page_delete_get = (req, res) => {
  res.send('NOT IMPLEMENTED: page delete GET');
};

// Handle page update on POST.
exports.page_update_post = (req, res) => {
  res.send('NOT IMPLEMENTED: page update POST');
};

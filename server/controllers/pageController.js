const Page = require('../models/Page');
const app = require('../nextApp');

// Display list of all pages.
exports.page_list = function(req, res) {
  Page.find({}, (err, data) => {
    app.render(req, res, '/admin', { data });
  });
};

exports.page_list_api = function(req, res) {
  Page.find({}, (err, data) => {
    res.json(data);
  });
};

// Display detail page for a specific page.
exports.page_detail = function(req, res) {
  res.send('NOT IMPLEMENTED: page detail: ' + req.params.id);
};

// Handle page create on POST.
exports.page_create_post = function(req, res) {
  const body = req.body;
  // const body = {
  //   author: 'Łukasz Kupis',
  //   title: 'Nowa Strona',
  //   content: 'lorem lorem',
  //   excerpt: 'lorem',
  //   status: 'published',
  //   template: 'default'
  // };

  const pageData = new Page(body);
  const errors = pageData.validateSync();

  pageData.save(err => {
    if (err) {
      res.render('admin/page-form', { errors, body });
      return;
    }

    res.redirect('/admin');
  });
};

// Display page delete form on GET.
exports.page_delete_get = function(req, res) {
  res.send('NOT IMPLEMENTED: page delete GET');
};

// Handle page update on POST.
exports.page_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: page update POST');
};

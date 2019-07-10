const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pageSchema = new Schema({
  author: { type: String, required: true },
  created: { type: Date, default: Date.now },
  title: { type: String, required: true },
  content: { type: String, required: true },
  excerpt: { type: String, required: true },
  status: { type: String, required: true },
  template: { type: String, required: true }
});

module.exports = mongoose.model('Page', pageSchema);

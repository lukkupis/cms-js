const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pageSchema = new Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  created: { type: Date, default: Date.now },
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: false },
  excerpt: { type: String, required: false },
  status: { type: String, enum: ['published', 'sketch'], required: true },
  template: { type: String, required: true, default: 'default' }
});

module.exports = mongoose.model('Page', pageSchema);

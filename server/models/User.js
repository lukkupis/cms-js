const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pageSchema = new Schema({
  login: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  registered: { type: Date, default: Date.now },
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  permissions: { type: String, required: true }
});

module.exports = mongoose.model('User', pageSchema);

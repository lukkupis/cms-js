const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  login: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  registered: { type: Date, default: Date.now },
  name: { type: String, required: true },
  email: { type: String, required: true },
  permissions: { type: String, enum: ['admin', 'user'], required: true }
});

module.exports = mongoose.model('User', userSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema = new Schema({
  title: { type: String, required: true },
  name: { type: String, required: true },
  order: { type: Number, required: true },
  page: { type: mongoose.Schema.Types.ObjectId, ref: "Page", required: true }
});

module.exports = mongoose.model("Menu", menuSchema);

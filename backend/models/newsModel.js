const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: date,
    required: true,
  },
  tags: {
    type: Array,
  },
});

module.exports = mongoose.model("New", newsSchema);

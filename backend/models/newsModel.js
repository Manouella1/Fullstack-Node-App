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
    maxlength: 1000,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  tags: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("New", newsSchema);

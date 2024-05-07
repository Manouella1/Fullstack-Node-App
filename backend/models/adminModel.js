const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  adminPassword: {
    type: String,
    required: true,
  },
  adminName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  role: {
    type: number,
    required: true,
  },
});

module.exports = mongoose.model("admin", adminSchema);

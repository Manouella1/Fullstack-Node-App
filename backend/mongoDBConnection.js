const mongoose = require("mongoose");

const mongoConnection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/news_blogs");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = mongoConnection;

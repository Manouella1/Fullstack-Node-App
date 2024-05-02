const mongoose = require("mongoose");

const mongoConnection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/mongoDB_game_store");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = mongoConnection;

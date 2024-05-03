const newsModel = require("../models/newsModel");

exports.getNews = async (req, res) => {
  try {
    const theNews = await newsModel.find();
    return res.status(200).json(theNews);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.getNew = async (req, res) => {
  const { title } = req.params;
  try {
    const aNews = await newsModel.findOne({ title: title });
    return res.status(200).json(aNews);
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      error: "Could not retrieve specified article",
    });
  }
};

exports.postNews = async (req, res) => {
  const {
    newsTitle,
    newsAuthor,
    newsText,
    newsDate,
    newsTag1,
    newsTag2,
    newsTag3,
  } = req.body;

  try {
    const newArticle = new newsModel({
      title: newsTitle,
      author: newsAuthor,
      text: newsText,
      date: newsDate,
      tags: [newsTag1, newsTag2, newsTag3],
    });
    const insertNews = await newArticle.save();
    return res.status(200).json(insertNews);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.putNews = async (req, res) => {
  const {
    newsTitle,
    newsAuthor,
    newsText,
    newsDate,
    newsTag1,
    newsTag2,
    newsTag3,
  } = req.body;

  try {
    await newsModel.updateOne(
      { title: newsTitle },
      {
        title: newsTitle,
        author: newsAuthor,
        text: newsText,
        date: newsDate,
        tags: [newsTag1, newsTag2, newsTag3],
      }
    );
    const insertNews = await newsModel.find({ title: newsTitle });
    return res.status(200).json(insertNews);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.delNews = async (req, res) => {
  const { newsTitle } = req.body;
  try {
    const deleteNews = await newsModel.deleteOne({ title: newsTitle });
    return res.status(200).json(deleteNews);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.findArticleById = async (req, res) => {
  const { id } = req.params;
  try {
    const oneArticle = await newsModel.findById(id);
    return res.status(200).json(oneArticle);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Could not retrieve article by id",
    });
  }
};

exports.deleteArticleById = async (req, res) => {
  try {
    const { id } = req.body;
    const deleteById = await newsModel.findByIdAndDelete(id);
    return res.status(200).json(deleteById);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

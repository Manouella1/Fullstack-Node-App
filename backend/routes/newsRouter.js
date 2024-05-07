const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");

// hämta alla nyheter
router.get("/api/news", newsController.getNews);
// hämta via _id
router.get("/api/news/:id", newsController.getById);
// skicka in nyhet/blog
router.post("/api/news", newsController.postNews);
// redigera nyhet
router.put("/api/news/:id", newsController.putNews);
// radera nyhet via _id
router.delete("/api/news/:id", newsController.deleteArticleById);

module.exports = router;

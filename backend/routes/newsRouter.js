const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");

// hämta alla nyheter
router.get("/news", newsController.getNews);
// hämta en nyhet
router.get("/news/:title", newsController.getNew);
// hämta via _id
router.get("/news-id/:id", newsController.findArticleById);
// skicka in nyhet/blog
router.post("/news", newsController.postNews);
// redigera nyhet
router.put("/news", newsController.putNews);
//  radera nyhet
router.delete("/news-delbytitle", newsController.delNews);
// radera nyhet via _id
router.delete("/news-deleId", newsController.deleteArticleById);

module.exports = router;

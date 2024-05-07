const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

const adminController = require("../controllers/adminController");

// Protected routes
router.get("/", verifyToken, (req, res) => {
  res.status(200).json({ message: "Protected route accessed" });
});

// router.post("/books", verifyToken, adminController.postCustomer);

module.exports = router;

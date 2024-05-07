const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

const bookController = require("../controllers/customerController");

// Protected routes
router.get("/", verifyToken, (req, res) => {
  res.status(200).json({ message: "Protected route accessed" });
});

router.post("/api/customer", verifyToken, customerController.postCustomer);

module.exports = router;

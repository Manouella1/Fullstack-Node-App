const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

const adminController = require("../controllers/customerController");

// Protected routes
router.get("/", verifyToken, (req, res) => {
  res.status(200).json({ message: "Protected route accessed" });
});
router.post("/loginAdmin", adminController.loginAdmin);
router.post("/loginAdmin", verifyToken, adminController.loginAdmin);

module.exports = router;

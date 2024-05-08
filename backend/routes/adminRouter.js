const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/registerAdmin", adminController.registerAdmin);
router.post("/loginAdmin", adminController.loginAdmin);

router.get("/admin", adminController.getAdmin);
// router.delete("/deleteAdmin", adminController.loginAdmin);

module.exports = router;

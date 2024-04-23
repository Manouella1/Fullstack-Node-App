const express = require("express");
const router = express.Router();

const spelControl = require("../controllers/spelController");

router.get("/spel", spelControl.getSpel);
router.post("/spel", spelControl.postSpel);
router.put("/spel", spelControl.putSpel);
router.delete("/spel", spelControl.delSpel);

module.exports = router;

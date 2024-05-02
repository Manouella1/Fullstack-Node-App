const express = require("express");
const router = express.Router();

const spelControl = require("../controllers/spelController");

// Hämta alla spel
router.get("/games", spelControl.getGames);
// Hämta ett spel
router.get("/games/:id", spelControl.getGame);
// Lägg till nytt spel
router.post("/games/suggestions", spelControl.postGame);
// Ändra ett spel
router.put("/games", spelControl.putGame);
// Radera ett spel
router.delete("/games", spelControl.delGame);

module.exports = router;

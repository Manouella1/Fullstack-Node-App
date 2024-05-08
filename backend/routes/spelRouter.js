const express = require("express");
const router = express.Router();

const spelControl = require("../controllers/spelController");

// Hämta alla spel
router.get("/api/games", spelControl.getGames);
// Hämta ett spel
router.get("/api/games/:id", spelControl.getGame);
// Lägg till nytt spel
router.post("/api/games/insert", spelControl.postGame);
// Ändra ett spel
router.put("/api/games/edit", spelControl.putGame);
// Radera ett spel
router.delete("/api/games/remove", spelControl.delGame);

module.exports = router;

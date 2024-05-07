const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get("/orders", orderController.getOrder);
router.post("/orders/place-order", orderController.postOrder);
router.patch("/orders/:id", orderController.patchOrder);
router.delete("orders/del", orderController.deleteOrder);
router.get("/orders/stock", orderController.listGameStock);

module.exports = router;

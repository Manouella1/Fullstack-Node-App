const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customerController");

router.get("/customers", customerController.getCustomers);

router.get("/customers/:id", customerController.getCustomerById);

router.post("/customer/register", customerController.registerCustomer);

router.patch("/api/customers/:id", customerController.patchCustomer);

router.delete("/api/customers/:id", customerController.deleteCustomer);

module.exports = router;

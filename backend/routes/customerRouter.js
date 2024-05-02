const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customerController");

router.get("/api/customers", customerController.getCustomers);

router.get("/api/customers/:id", customerController.getCustomerById);

router.post("/api/customers", customerController.postCustomer);

router.patch("/api/customers", customerController.patchCustomer);

router.delete("/api/customers/", customerController.deleteCustomer);

module.exports = router;

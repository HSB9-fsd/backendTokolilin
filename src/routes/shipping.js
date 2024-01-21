const express = require("express");
const shipping = require("../controllers/shipping");
const authentication = require("../../middlewares/autentication");

const router = express.Router();

router.get("/", authentication, shipping.readAllShipping);
router.get("/byUserId/:id", authentication, shipping.readShippingByUserId);
router.post("/", authentication, shipping.createShipping);
router.patch("/:id", authentication, shipping.updateShippingById);
router.delete("/:id", authentication, shipping.deleteShippingById);

module.exports = router;

const express = require("express");
const address = require("../controllers/address");
const authentication = require("../../middlewares/autentication");

const router = express.Router();

router.post("/", authentication, address.createAddress);
router.get("/", authentication, address.readAllAddress);
router.get("/:id", authentication, address.readAddressByUserId);
router.patch("/:id", authentication, address.updateAddressById);
router.patch("/update/:id", authentication, address.updateAddressByIdAddress);
router.delete("/:id", authentication, address.deleteAddressById);

module.exports = router;

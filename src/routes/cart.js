const express = require("express");
const cart = require("../controllers/cart");
const authentication = require("../../middlewares/autentication");

const router = express.Router();

router.post("/", authentication, cart.createCart);
router.get("/", authentication, cart.readAllCart);
router.get("/:id", authentication, cart.readCartByUserId);
router.delete("/:id", authentication, cart.deleteCartById);

module.exports = router;

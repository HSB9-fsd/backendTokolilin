const express = require("express");
const cartItem = require("../controllers/cartItem");
const authentication = require("../../middlewares/autentication");

const router = express.Router();

router.post("/", authentication, cartItem.createCartItem);
router.get("/", authentication, cartItem.readAllCartItem);
router.delete("/:id", authentication, cartItem.deleteCartItemById);
router.patch("/:id", authentication, cartItem.updateCartItemById);
router.patch("/checkout/:id", authentication, cartItem.checkoutCartItem);

module.exports = router;

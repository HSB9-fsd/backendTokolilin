const express = require("express");

const userRouter = require("../routes/user");
const productRouter = require("../routes/product");
const addressRouter = require("../routes/address");
const cartItemRouter = require("../routes/cartItem");
const cartRouter = require("../routes/cart");
const shippingRouter = require("../routes/shipping");
const router = express.Router();

router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/address", addressRouter);
router.use("/cartItem", cartItemRouter);
router.use("/cart", cartRouter);
router.use("/shipping", shippingRouter);

module.exports = router;

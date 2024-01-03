const express = require('express');

const userRouter = require('../routes/user');
const productsRouter = require('../routes/product.js');
const router = express.Router();

router.use('/user', userRouter);
router.use('/products', productsRouter);
module.exports = router;

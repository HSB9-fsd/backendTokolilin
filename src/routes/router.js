const express = require('express');
const userRouter = require('../routes/user');
const productRouter = require('../routes/product');

const router = express.Router();
router.use('/user', userRouter);
router.use('/products', productRouter);

module.exports = router;

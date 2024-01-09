const express = require('express');

const userRouter = require('../routes/user');
const productRouter = require('../routes/product');
const addressRouter = require('../routes/address');
const router = express.Router();

router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/address', addressRouter);

module.exports = router;

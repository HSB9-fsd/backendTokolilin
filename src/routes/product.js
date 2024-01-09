const express = require('express');
const product = require('../controllers/product');

const router = express.Router();

router.get('/', product.getAllProduct);
router.get('/:id', product.getOneProduct);
router.post('/', product.createProduct);
router.patch('/:id', product.updateProduct);
router.delete('/:id', product.deleteProduct);

module.exports = router;
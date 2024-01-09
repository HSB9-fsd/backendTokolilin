const express = require('express');
const address = require('../controllers/address');

const router = express.Router();

router.post('/', address.createAddress);
router.get('/', address.readAllAddress);
router.patch('/:id', address.updateAddressById);
router.delete('/:id', address.deleteAddressById);

module.exports = router;
const express = require('express');
const address = require('../controllers/address');
const authentication = require('../../middlewares/autentication');

const router = express.Router();

router.post('/', authentication, address.createAddress);
router.get('/', authentication, address.readAllAddress);
router.patch('/:id',authentication, address.updateAddressById);
router.delete('/:id', authentication, address.deleteAddressById);

module.exports = router;
const express = require('express')
const router = express.Router();
const { getALlProducts, addProducts } = require('../controllers/product')


router.get('/', getALlProducts)
router.post('/', addProducts)

module.exports = router
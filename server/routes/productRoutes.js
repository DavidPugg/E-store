const express = require('express');
const router = express.Router();

const controller = require('../controllers/productController')

router.get('/', controller.getProducts);
router.get('/:id', controller.getProduct);
router.post('/cart', controller.addToCart);
router.put('/cart', controller.changeQty);
router.delete('/cart', controller.removeCartItem)

module.exports = router
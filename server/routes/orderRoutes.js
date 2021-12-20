const express = require('express');
const router = express.Router();

const controller = require('../controllers/orderController');

router.post('/', controller.completeOrder);
router.get('/', controller.getOrders);

module.exports = router;
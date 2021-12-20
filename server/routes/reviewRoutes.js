const express = require('express')
const router = express.Router({mergeParams: true});
const controller = require('../controllers/reviewController');

router.post('/', controller.addReview)
router.delete('/', controller.deleteReview)

module.exports = router;
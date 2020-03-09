const express = require('express');
const router = express.Router({ mergeParams: true });
const { getReviews, getReview, createReview } = require('../controllers/ReviewController');

const Review = require('../models/Review');
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');


router.route('/')
    .get(advancedResults(Review, { path: 'bootcamp', select: 'name description' }), getReviews)
    .post(protect, authorize('user', 'admin'), createReview);
router.route('/:id')
    .get(getReview)

module.exports = router;
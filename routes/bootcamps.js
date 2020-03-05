const express = require('express');
const router = express.Router();
const {
    index,
    show,
    store,
    update,
    $delete,
    getBootcampsInRadius,
    bootcampPhotoUpload
} = require('../controllers/BootcampController');

const Bootcamp = require('../models/Bootcamp');
const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');

// Include other resource routers
// const courseRouter = require('./courses');

// Re-route into other resource routers
router.use('/:bootcampId/courses', require('./courses'));

// Routes
router.route('/radius/:zipcode/:distance')
    .get(getBootcampsInRadius);
router.route('/')
    .get(advancedResults(Bootcamp, 'courses'), index)
    .post(protect, store);
router.route('/:id')
    .get(show)
    .put(protect, update)
    .delete(protect, $delete);
router.route('/:id/photo')
    .put(protect, bootcampPhotoUpload);

module.exports = router;

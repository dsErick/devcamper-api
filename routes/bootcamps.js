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

// Include other resource routers
// const courseRouter = require('./courses');

// Re-route into other resource routers
router.use('/:bootcampId/courses', require('./courses'));

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);
router.route('/').get(index).post(store);
router.route('/:id').get(show).put(update).delete($delete);
router.route('/:id/photo').put(bootcampPhotoUpload);

module.exports = router;

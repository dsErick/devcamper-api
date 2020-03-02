const express = require('express');
const router = express.Router();
const {
    index,
    show,
    store,
    update,
    $delete,
    getBootcampsInRadius
} = require('../controllers/BootcampController');

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);
router.route('/').get(index).post(store);
router.route('/:id').get(show).put(update).delete($delete);

module.exports = router;

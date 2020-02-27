const express = require('express');
const router = express.Router();
const { index, store, show, update, $delete } = require('../controllers/BootcampController');

router.route('/').get(index).post(store);
router.route('/:id').get(show).put(update).delete($delete);

module.exports = router;

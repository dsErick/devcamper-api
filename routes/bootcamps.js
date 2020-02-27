const express = require('express');
const router = express.Router();
const { index, store } = require('../controllers/BootcampController');

router.route('/').get(index).post(store);

module.exports = router;

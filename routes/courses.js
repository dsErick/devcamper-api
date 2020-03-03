const express = require('express');
const router = express.Router();
const { getCourses } = require('../controllers/CourseController');

router.get('/', getCourses);

module.exports = router;
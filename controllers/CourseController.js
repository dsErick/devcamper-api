const asyncHandler = require('../middleware/asyncHandler');
const Course = require('../models/Course');

// @desc    Get all courses
// @route   GET /api/v1/courses
// access   Public
exports.getCourses = asyncHandler(async (req, res, next) => {
    const courses = await Course.find();
    
    res.status(200).json({
        success: true,
        count: courses.length,
        data: courses
    });
});
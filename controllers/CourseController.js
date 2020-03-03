const asyncHandler = require('../middleware/asyncHandler');
const Course = require('../models/Course');

// @desc    Get courses
// @route   GET /api/v1/courses
// @route   GET /api/v1/bootcamps/:bootcampId/courses
// @access   Public
exports.getCourses = asyncHandler(async (req, res, next) => {
    let query;

    // Verify if bootcamp id is passed as a param
    req.params.bootcampId ?
        query = Course.find({ bootcamp: req.params.bootcampId }) :
        query = Course.find().populate({ path: 'bootcamp', select: 'name description' });

    const courses = await query;
     
    res.status(200).json({
        success: true,
        count: courses.length,
        data: courses
    });
});

// @desc    Get course
// @route   GET /api/v1/courses/:id
// @route   GET /api/v1/bootcamps/:bootcampId/courses/:id
// access   Public
exports.getCourse = asyncHandler(async (req, res, next) => {
    let query;

    req.params.bootcampId ?
        query = Course.findOne({ _id: req.params.id, bootcamp: req.params.bootcampId }) :
        query = Course.findById(req.params.id);

    const course = await query;

    res.status(200).json({
        success: true,
        data: course
    })
});

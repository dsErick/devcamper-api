const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');

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

// @desc    Get single course
// @route   GET /api/v1/courses/:id
// access   Public
exports.getCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id).populate({
        path: 'bootcamp',
        select: 'name description'
    });

    if (!course) return next(new ErrorResponse(`Course not found with the id of ${req.params.id}`, 404));
    
    res.status(200).json({
        success: true,
        data: course
    })
});

// @desc    Add a course to a bootcamp
// @route   POST /api/v1/bootcamps/:bootcampId/courses
// @route   Private
exports.addCourse = asyncHandler(async (req, res, next) => {
    req.body.bootcamp = req.params.bootcampId;
    
    const bootcamp = await Bootcamp.findById(req.params.bootcampId);
    
    if (!bootcamp) return next(new ErrorResponse(`Bootcamp not found with the id of ${req.params.bootcampId}`, 404));
    
    const course = await Course.create(req.body);

    res.status(201).json({
        success: true,
        data: course
    })
});



// @desc    Update a course
// @route   PUT /api/v1/courses/:id
// @access  Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
    // @route   PUT /api/v1/bootcamps/:bootcampId/courses/:id
    // const bootcamp = await Bootcamp.findById(req.params.bootcampId);
    // if (!bootcamp) return next(new ErrorResponse(`Bootcamp not found with the id of ${req.params.bootcampId}`, 404));

    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!course) return next(new ErrorResponse(`Course not found with the id of ${req.params.id}`, 404));

    res.status(200).json({
        success: true,
        data: course
    })
});

// @desc    Delete a course
// @route   DELETE /api/v1/courses/:id
// @access  Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id);

    if (!course) return next(new ErrorResponse(`Course not found with the id of ${req.params.id}`, 404));

    await course.remove();
    
    res.status(200).json({
        success: true,
        data: course
    })
});
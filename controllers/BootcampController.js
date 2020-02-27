// @desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public
exports.index = async (req, res, next) => {
    res.json({ success: true, data: { msg: 'Get all bootcamps' } });
}

// @desc Create a bootcamp
// @route POST /api/v1/bootcamps
// @access Public
exports.store = async (req, res, next) => {
    res.json({ success: true, data: { msg: 'Create a bootcamp' } });
}
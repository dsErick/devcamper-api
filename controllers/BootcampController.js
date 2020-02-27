// @desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public
exports.index = async (req, res, next) => {
    res.json({ success: true, data: { msg: 'Get all bootcamps' } });
}

// @desc Create a new bootcamp
// @route POST /api/v1/bootcamps
// @access Public
exports.store = async (req, res, next) => {
    res.json({ success: true, data: { msg: 'Create a new bootcamp' } });
}

// @desc Display bootcamp with specified id
// @route GET /api/v1/bootcamps/:id
// @access Public
exports.show = async (req, res, next) => {
    res.json({ success: true, data: { msg: `Display bootcamp with id ${req.params.id}` } });
}

// @desc Update bootcamp with specified id
// @route PUT /api/v1/bootcamps/:id
// @access Public
exports.update = async (req, res, next) => {
    res.json({ success: true, data: { msg: `Update bootcamp with id ${req.params.id}` } });
}

// @desc Delete bootcamp with specified id
// @route DELETE /api/v1/bootcamps/:id
// @access Public
exports.$delete = async (req, res, next) => {
    res.json({ success: true, data: { msg: `Delete bootcamp with id ${req.params.id}` } });
}
// @desc        Get all bootcamps
// @route       GET /api/v1/bootcamps
// @access      Public
exports.index = async (req, res, next) => {
    res.status(200).json({ success: true, data: { msg: 'Get all bootcamps' } });
}

// @desc        Get single bootcamp 
// @route       GET /api/v1/bootcamps/:id
// @access      Public
exports.show = async (req, res, next) => {
    res.status(200).json({ success: true, data: { msg: `Get single bootcamp` } });
}

// @desc        Create a new bootcamp
// @route       POST /api/v1/bootcamps
// @access      Private
exports.store = async (req, res, next) => {
    res.status(201).json({ success: true, data: { msg: 'Create a new bootcamp' } });
}

// @desc        Update bootcamp with specified id
// @route       PUT /api/v1/bootcamps/:id
// @access      Private
exports.update = async (req, res, next) => {
    res.status(200).json({ success: true, data: { msg: `Update bootcamp with id ${req.params.id}` } });
}

// @desc        Delete bootcamp with specified id
// @route       DELETE /api/v1/bootcamps/:id
// @access      Private
exports.$delete = async (req, res, next) => {
    res.status(200).json({ success: true, data: { msg: `Delete bootcamp with id ${req.params.id}` } });
}
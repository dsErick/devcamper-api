const Bootcamp = require('../models/Bootcamp');

// @desc        Get all bootcamps
// @route       GET /api/v1/bootcamps
// @access      Public
exports.index = async (req, res, next) => {
    try {
        const bootcamps = await Bootcamp.find();
        res.status(200).json({
            success: true,
            count: bootcamps.length,
            data: bootcamps
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        })
    }
}

// @desc        Get single bootcamp 
// @route       GET /api/v1/bootcamps/:id
// @access      Public
exports.show = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id);

        if(!bootcamp) return res.status(400).json({ success: false, error: 'Bootcamp not found' })

        res.status(200).json({
            success: true,
            data: bootcamp
        });
        
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        })
    }
}

// @desc        Create a new bootcamp
// @route       POST /api/v1/bootcamps
// @access      Private
exports.store = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body);
        res.status(201).json({
            success: true,
            data: bootcamp
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        })
    }
}

// @desc        Update bootcamp with specified id
// @route       PUT /api/v1/bootcamps/:id
// @access      Private
exports.update = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!bootcamp) return res.status(400).json({ success: false, error: 'Bootcamp not found' });
        
        res.status(200).json({
            success: true,
            data: bootcamp
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        })
    }
}

// @desc        Delete bootcamp with specified id
// @route       DELETE /api/v1/bootcamps/:id
// @access      Private
exports.$delete = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

        if (!bootcamp) return res.status(400).json({ success: false, error: 'Bootcamp not found' });
        
        res.status(200).json({
            success: true,
            data: bootcamp
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        })
    }
}
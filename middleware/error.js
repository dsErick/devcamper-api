const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;
    
    // log to console for dev
    console.log(`\x1b[31m${err.stack}\x1b[0m`);

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = `${err.model.modelName} not found`;
        error = new ErrorResponse(message, 404);
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        // const field = Object.keys(err.keyValue);
        // error.field = field;
        const message = `Duplicate field value entered`;
        error = new ErrorResponse(message, 400);
    }

    // Mongoose Validation Error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400);
    }
    
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });
}

module.exports = errorHandler;
const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please add a tittle for the review'],
        maxlength: [100, 'Title cannot be more than 100 character']
    },
    text: {
        type: String,
        required: [true, 'Please add some text'],
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
        required: [true, 'Please add a rating between 1 and 10'],
    },
    bootcamp: {
        type: mongoose.Types.ObjectId,
        ref: 'Bootcamp',
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Review', ReviewSchema);
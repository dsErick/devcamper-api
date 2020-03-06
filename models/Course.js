const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        trim: true
    },
    weeks: {
        type: String,
        required: [true, 'Please add a number of weeks']
    },
    tuition: {
        type: Number,
        required: [true, 'Please add a tuition cost'],
    },
    minimumSkill: {
        type: String,
        required: [true, 'Please add a minimum skill'],
        enum: ['beginner', 'intermediate', 'advanced']
    },
    scholarshipsAvailable: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
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
    }
});

// Static method to get average of course tuitions
CourseSchema.statics.getAverageCost = async function(bootcampId) {
    const obj = await this.aggregate([
        { $match: { bootcamp: bootcampId } },
        { 
            $group: {
                _id: '$bootcamp',
                averageCost: { $avg: '$tuition' }
            }
        }
    ]);

    try {
        await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
            averageCost: Math.ceil(obj[0].averageCost / 10) * 10
        });
    } catch (err) {
        console.error(err);
    }
}

// Call getAverageCost after save
CourseSchema.post('save', function() {
    this.constructor.getAverageCost(this.bootcamp);
});

// Call getAverageCost before remove
CourseSchema.pre('remove', function() {
    this.constructor.getAverageCost(this.bootcamp);
});

module.exports = mongoose.model('Course', CourseSchema);
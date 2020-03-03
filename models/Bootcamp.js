const mongoose = require('mongoose');
const slugify = require('slugify');
const geocoder = require('../utils/geocoder');

const BootcampSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [500, 'Description cannot be more than 500 characters'],
        trim: true
    },
    website: {
        type: String,
        // javascript regex url
        match: [/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, 'Please use a valid URL with HTTP or HTTPS']
    },
    phone: {
        type: String,
        maxlength: [20, 'Phone number cannot be more than 20 charaacters']
    },
    email: {
        type: String,
        // javascript regex email
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            // /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            , 'Please add valid email']
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    location: {
        // GeoJSON Point
        type: {
            type: String,
            enum: ['Point'],
            // require: true
        },
        coordinates: {
            type: [Number],
            // required: true,
            index: '2dsphere'
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String
    },
    careers: {
        type: [String],
        required: true,
        enum: ['Web Development', 'Mobile Development',
            'UI/UX', 'Data Science', 'Business', 'Other']
    },
    averageRating: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [10, 'Rating must cannot be more than 10']
    },
    averageCost: Number,
    photo: {
        type: String,
        default: 'no-photo.jpg'
    },
    housing: {
        type: Boolean,
        default: false
    },
    jobAssistance: {
        type: Boolean,
        default: false
    },
    jobGuarantee: {
        type: Boolean,
        default: false
    },
    acceptGi: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    }/* ,
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    } */
}, {
    toJSON: { virtuals: true }
});

BootcampSchema.pre('save', async function(next) {
    // Trim spaces between words
    this.name = this.name.replace(/\s\s+/g, ' ');
    
    // Create bootcamp slug from the name
    this.slug = slugify(this.name, {
        remove: /[*+~.()'"!:@]/g,
        lower: true
    });

    // Geocode && create location
    const loc = await geocoder.geocode(this.address);
    
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
        street: loc[0].streetName,
        city: loc[0].city,
        state: loc[0].stateCode,
        zipcode: loc[0].zipcode,
        country: loc[0].countryCode
    }
    
    // Do not save address
    this.address = undefined;

    next();
});

// Cascade delete courses when a bootcamp is deleted
BootcampSchema.pre('remove', async function(next) {
    await this.model('Course').deleteMany({ bootcamp: this._id });
    next();
});

// Reverse populate with virtuals
BootcampSchema.virtual('courses', {
    ref: 'Course',
    localField: '_id',
    foreignField: 'bootcamp'
});

module.exports = mongoose.model('Bootcamp', BootcampSchema);
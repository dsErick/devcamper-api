const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
// const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect MongoDB
connectDB();

const app = express();

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 100
});

app.use(
    express.json(),     // Body parser
    fileUpload(),       // Fileupload
    cookieParser(),     // Cookie Parser
    mongoSanitize(),    // Sanitize data
    helmet(),           // Set security headers
    xss(),              // Prevent XSS (Cross Site Scripting) attacks
    limiter,            // Rate limiting
    hpp(),              // Prevent http param pollution
    // cors(),          // Enable cors
    express.static(path.join(__dirname, 'public')) // Static folder
);

// Dev logging middleware
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Mount Routers
app.use('/api/v1/bootcamps', require('./routes/bootcamps'));
app.use('/api/v1/courses', require('./routes/courses'));
app.use('/api/v1/reviews', require('./routes/reviews'));
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/users', require('./routes/users'));

// Custom Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.error(err.message);
    // Close server && exit process
    server.close(() => process.exit(1));
});
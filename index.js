const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' });

const app = express();

// Connect MongoDB
// connectDB();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable cors
// app.use(cors());

// Static folder
// app.use(express.static(path.join(__dirname, 'public')));

// Dev logging middleware
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Routes
app.use('/api/v1/bootcamps', require('./routes/bootcamps'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
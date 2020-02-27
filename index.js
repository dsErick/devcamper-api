const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

const app = express();

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect MongoDB
connectDB();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable cors
// app.use(cors());

// Static folder
// app.use(express.static(path.join(__dirname, 'public')));


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env'});

// Load models
const Bootcamp = require('./models/Bootcamp');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
   useNewUrlParser: true,
   useCreateIndex: true,
   useFindAndModify: false,
   useUnifiedTopology: true 
});

// Read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));

// Import into DB
const importData = async () => {
    try {
        await Bootcamp.create(bootcamps);

        console.log(`\x1b[7m\x1b[32mData imported...\x1b[0m`);
        process.exit(1);
    } catch (err) {
        console.error(err);
    }
}

// Delete data
const deleteData = async () => {
    try {
        await Bootcamp.deleteMany();
        
        console.log('\x1b[7m\x1b[31mData destroyed...\x1b[0m');
        process.exit(1);
    } catch (err) {
        console.error(err);
    }
}

if(process.argv[2] === '-i') importData();
else if (process.argv[2] === '-d') deleteData();
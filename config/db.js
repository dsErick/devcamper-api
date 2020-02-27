const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
           useNewUrlParser: true,
           useFindAndModify: true,
           useCreateIndex: false,
           useUnifiedTopology: true
        });
        console.log(`Mongo connected on host ${conn.connection.host}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

module.exports = connectDB;

const mongoose = require('mongoose');


const connectDB = async () => {
const url = process.env.DATABASE_URL || 'mongodb://localhost:27017/serenica';
await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
console.log('MongoDB connected');
};


module.exports = connectDB;
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    
    
    const conn = await mongoose.connect('mongodb://127.0.0.1:27017/Mydb');
    
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1); 
  }
};

module.exports = connectDB;

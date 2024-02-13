// backend/src/services/databaseService.js

import mongoose from 'mongoose';
import config from '../config.js';

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongodbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Si no se puede conectar a la base de datos, salimos del proceso con un código de error
  }
};

export default connectDB;

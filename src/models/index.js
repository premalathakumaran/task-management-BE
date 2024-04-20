
// models/index.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbUrl = process.env.dbUrl;

try {
  mongoose.connect(dbUrl);
  console.log("Mongoose connected successfully!");
} catch (error) {
  console.error("Error connecting to mongoose:", error);
}

export default mongoose;
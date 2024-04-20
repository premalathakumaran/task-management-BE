

// import mongoose from 'mongoose'
// import dotenv from 'dotenv'
// dotenv.config()

// try {
//     mongoose.connect(`${process.env.dbUrl}/${process.env.dbName}`)
//     console.log("mongoose connected ")
// } catch (error) {
//     console.log(error)
// }
// export default mongoose


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
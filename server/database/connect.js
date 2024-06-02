
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI , {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.log(`MongoDB connection error: ${err}`);
  }
 
};

export default connectDatabase;
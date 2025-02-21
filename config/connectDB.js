import "dotenv/config";
import mongoose from "mongoose";

const uri = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    if (!uri) {
      console.log("MONGO_URI is not define in .env file");
    }

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connectedion error: ", error.message);
    process.exit(1);
  }
};

export default connectDB;

import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import router from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Use Routes
app.use("/api/users", router);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Database Connection Failed: ", error);
  }
};

startServer();

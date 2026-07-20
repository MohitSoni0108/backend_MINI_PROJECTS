import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";


const app = express();


const PORT = process.env.PORT || 3000;

const startServer = async () => {
  // Step 1: wait for MongoDB connection to succeed
  await connectDB();

  // Step 2: only now start accepting HTTP requests
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import customerRoutes from "./routes/customer.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

await connectDB();

app.use("/customers", customerRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
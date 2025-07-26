import express from "express";
import dotenv from "dotenv";
import authRoutes from "./authRoutes/routes.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);

app.listen(5000, () => console.log("server is running on port 5000"));

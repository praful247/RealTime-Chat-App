import express from "express";
import dotenv from "dotenv";
import "./models/Users.js";
import passport from "./services/passport.js";
import authRoutes from "./authRoutes/routes.js";
import mongoose from "mongoose";
import session from "express-session";
import keys from "./config/keys.js";
dotenv.config();

const app = express();

console.log("MONGO_URI:", process.env.MONGO_URI);

mongoose.connect(keys.mongoURI);

app.use(
  session({
    secret: "helloji",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 5000;

app.use("/", authRoutes);

app.listen(5000, () => console.log("server is running on port 5000"));

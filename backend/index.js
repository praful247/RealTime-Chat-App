import express from "express";
import dotenv from "dotenv";
import "./models/Users.js";
import messageRoutes from "./authRoutes/messageroutes.js";
import cookieParser from "cookie-parser";
import passport from "./services/passport.js";
import authRoutes from "./authRoutes/routes.js";
import userRoutes from "./authRoutes/userRoutes.js";
import { app,server } from "./socket/socket.js";

import connecttomongodb from "./db/connecttomongodp.js";
import path from "path";
import {fileURLToPath} from "url";
dotenv.config();

const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cookieParser());



console.log("MONGO_URI:", process.env.MONGO_URI);



// app.use(
//   session({
//     secret: "helloji34342",  we are not using cookie based 
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: process.env.NODE_ENV!=="development" ? true : false },
//   })
// );

app.use(passport.initialize());
// app.use(passport.session());


app.use(authRoutes);
app.use("/messages" , messageRoutes);
app.use("/api/users" ,userRoutes );  // this tells express "For any incoming request whose path starts with /users, I want you to pass it over to the userRoutes router


if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")));

    // Catch-all handler: send back React's index.html file for any non-API routes
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
}



server.listen(PORT, () =>{
  connecttomongodb();
console.log(`server is running on port ${PORT}`)
} );
 
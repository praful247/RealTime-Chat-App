import express from "express";
import fs from "fs";
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
const distIndexPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "../frontend/dist/index.html");
const distExists = fs.existsSync(distIndexPath);

// #region agent log
fetch("http://127.0.0.1:7936/ingest/bf1339d7-8f32-49d2-8e5b-b874c50dd268", {
	method: "POST",
	headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "77c9b3" },
	body: JSON.stringify({
		sessionId: "77c9b3",
		location: "backend/index.js:pre-routes",
		message: "Runtime env and assets before routes",
		data: {
			PORT,
			nodeEnv: process.env.NODE_ENV ?? null,
			distExists,
			mongoConfigured: !!(process.env.MONGO_URI || process.env.MONGO_CONNECTION_STRING),
		},
		timestamp: Date.now(),
		hypothesisId: "H2-H3-H4",
	}),
}).catch(() => {});
// #endregion

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cookieParser());

app.get("/health", (_req, res) => {
	res.status(200).type("text/plain").send("ok");
});

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


if (process.env.NODE_ENV === "production") {
	const distDir = path.join(__dirname, "../frontend/dist");
	const indexHtml = path.join(distDir, "index.html");
	app.use(express.static(distDir));
	app.get("*", (req, res) => {
		res.sendFile(indexHtml, (err) => {
			if (err) {
				console.error("FRONTEND ERROR: Could not send index.html:", err.message);
				res.status(404).send("Build file not found on server.");
			}
		});
	});
}



server.listen(PORT, "0.0.0.0", () => {
	connecttomongodb();
	console.log(`server is running on port ${PORT}`);
	// #region agent log
	const addr = server.address();
	fetch("http://127.0.0.1:7936/ingest/bf1339d7-8f32-49d2-8e5b-b874c50dd268", {
		method: "POST",
		headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "77c9b3" },
		body: JSON.stringify({
			sessionId: "77c9b3",
			location: "backend/index.js:listen",
			message: "HTTP server listen result",
			data: { PORT, listenAddress: addr },
			timestamp: Date.now(),
			hypothesisId: "H5",
		}),
	}).catch(() => {});
	// #endregion
});
 
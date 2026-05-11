
import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);

const productionOrigins = () => {
	if (process.env.NODE_ENV !== "production") return ["http://localhost:5173"];
	const url = process.env.FRONTEND_URL?.trim();
	if (url) return [url];
	// Allow browser origin when the SPA is served from the same host (e.g. EC2 public IP on :80).
	return true;
};

const io = new Server(server, {
	cors: {
		origin: productionOrigins(),
		methods: ["GET", "POST"],
	},
});
const userSocketMap = {}; // {userId: socketId}

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};



io.on("connection", (socket) => {
	console.log("a user connected", socket.id);

	const userId = socket.handshake.query.userId;
	if (userId != "undefined") userSocketMap[userId] = socket.id;

	// io.emit() is used to send events to all the connected clients
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	// socket.on() is used to listen to the events. can be used both on client and server side
	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		delete userSocketMap[userId];  // deleted it
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { app, io, server };
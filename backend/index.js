import express from "express";
import cors from "cors";

import userRouter from "./routes/userRoutes.js";

// Initialise express server
const server = express();

// CORS policy configuration
const corsOptions = {
	origin: "*", // By default it will allow all origins
	allowedHeaders: ["Content-Type", "authorization"],
};

// Middlewares
server.use(cors(corsOptions));
server.use(express.json());

// API Routes
server.use("/users", userRouter);

// 404 Error handling middleware
server.use((req, res, next) => {
	return res.status(404).json({
		msg: "API route not found",
	});
});

// 500 Error handling middleware
server.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		msg: "Internal Server Error",
	});
});

export default server;

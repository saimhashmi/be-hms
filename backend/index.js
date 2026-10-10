import express from "express";
import cors from "cors";

import userRouter from "./routes/userRoutes.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import ErrorHandler from "./utils/errorHandler.js";

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

// Invalid API routes Error handling middleware (404)
server.use((req, res, next) => {
	const error = new ErrorHandler(
		`API route not found: ${req.method} ${req.originalUrl}`,
		404,
	);
	next(error);
});

// Error handling middleware, Must be registered LAST
server.use(errorHandlerMiddleware);

export default server;

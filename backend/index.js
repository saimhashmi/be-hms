import express from "express";
import cors from "cors";
import "dotenv/config";

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

server.get("/", (req, res) => {
	res.status(200).json({
		msg: "Hello, this is express server for healthcare management system",
	});
});

server.post("/data", (req, res) => {
	const { name, age } = req.body;
	if (name || age) {
		res.status(200).json({
			msg: "data received",
			data: { name, age },
		});
	}
	res.status(400).json({
		msg: "didn't receive data",
	});
});

export default server;

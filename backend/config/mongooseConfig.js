import mongoose from "mongoose";
import { ServerApiVersion } from "mongodb";

const url = process.env.MONGODB_URI || "mongodb://0.0.0.0:27017/HMS";

const options = {
	serverSelectionTimeoutMS: 20000, // Timeout after 20 seconds
	// New code to connect to mongodb atlas server
	serverApi: {
		version: ServerApiVersion.v1,
		// strict: true,
		deprecationErrors: true,
	},
	maxPoolSize: 10,
};

export const connectUsingMongoose = async () => {
	try {
		await mongoose.connect(url, options);
		console.log("Connection established to MongoDB");
	} catch (error) {
		console.log(error);
	}
};

export const closeMongoDBConnection = async () => {
	try {
		if (mongoose.connection.readyState !== 0) {
			await mongoose.connection.close();
			console.log("MongoDB connection closed");
		} else {
			console.warn(
				"Mongoose connection already closed or not established",
			);
		}
	} catch (error) {
		console.log(error);
	}
};

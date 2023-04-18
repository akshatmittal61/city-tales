import mongoose, { ConnectOptions } from "mongoose";
import { dbUri } from "@/config";

const connection = {
	isConnected: false,
};

const connectDB = async () => {
	if (connection.isConnected) {
		return;
	}

	await mongoose
		.connect(dbUri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		} as ConnectOptions)
		.then((db) => {
			console.log("Connected to MongoDB");
			connection.isConnected = db.connections[0].readyState === 1;
			return Promise.resolve(db);
		})
		.catch((err) => {
			console.log("Error connecting to MongoDB", err);
			return Promise.reject(err);
		});
};

export default connectDB;

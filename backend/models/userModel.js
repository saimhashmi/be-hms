import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: [true, "name is required"],
		minLength: [3, "The name should be at least 3 characters long"],
	},
	age: {
		type: Number,
		required: [true, "age is required"],
	},
});

const User = mongoose.model("User", userSchema);

export default User;

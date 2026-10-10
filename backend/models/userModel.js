import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: [true, "name is required"],
		minLength: [3, "name should be at least 3 characters long"],
	},
	// age: {
	// 	type: Number,
	// 	required: [true, "age is required"],
	// },
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: [true, "password is required"],
		minLength: [8, "password should be at least 8 characters long"],
		select: false,
	},
});

// pre hook/middleware to hash password
userSchema.pre("save", async function () {
	if (this.isModified("password")) {
		// To hash the password with 12 rounds of salt
		this.password = await bcrypt.hash(this.password, 12);
	}
	// call the next middleware in the stack
	// next();
});

// validate password for login
userSchema.methods.validatePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

// Generate Auth Token
userSchema.methods.generateAuthToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: "1d",
	});
};

const User = mongoose.model("User", userSchema);

export default User;

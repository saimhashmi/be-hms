import User from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";

export const getAllUsers = async (req, res, next) => {
	try {
		const users = await User.find();

		if (users) {
			throw new ErrorHandler("Requested item does not exist", 404);
		}

		return res.status(200).json({
			success: true,
			msg: "All users listed below",
			data: users,
		});
	} catch (error) {
		next(error);
	}
};

// export const addUser = async (req, res, next) => {
// 	const { name, age } = req.body;
// 	try {
// 		const user = new User({ name, age });
// 		await user.save();

// 		return res.status(201).json({
// 			msg: "user created successfully",
// 			data: user,
// 		});
// 	} catch (error) {
// 		console.log(error);
// 		return res.status(400).json({
// 			msg: "error creating user",
// 			error: error.message,
// 		});
// 	}
// };

export const userSignup = async (req, res, next) => {
	const { name, email, password } = req.body;
	// validating all required info is provided
	if (!name || !email || !password) {
		throw new ErrorHandler("Name, email, and password are required", 400);
	}
	try {
		// check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			throw new ErrorHandler(
				"User already exists, please login instead",
				400,
			);
		}

		// create new user
		const newUserId = (await new User({ name, email, password }).save()).id;
		const user = await User.findById(newUserId);

		return res.status(201).json({
			success: true,
			msg: "user created successfully",
			data: user,
		});
	} catch (error) {
		next(error);
	}
};

export const userSignin = async (req, res, next) => {
	const { email, password } = req.body;
	// validating all required info is provided
	if (!email || !password) {
		throw new ErrorHandler("invalid credentials", 401);
	}
	try {
		// check if user already exists
		const user = await User.findOne({ email }).select("+password");
		if (!user) {
			throw new ErrorHandler("invalid credentials", 401);
		}

		// validate user
		const isPasswordValid = await user.validatePassword(password);

		if (!isPasswordValid) {
			throw new ErrorHandler("invalid credentials", 401);
		}
		const token = await user.generateAuthToken();
		return res.status(200).json({
			success: true,
			msg: "user logged in successfully",
			token,
		});
	} catch (error) {
		next(error);
	}
};

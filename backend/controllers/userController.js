import User from "../models/userModel.js";

export const getAllUsers = async (req, res, next) => {
	try {
		const users = await User.find();

		return res.status(200).json({
			msg: "All users listed below",
			data: users,
		});
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			msg: "error finding users",
			error: error.message,
		});
	}
};

export const addUser = async (req, res, next) => {
	const { name, age } = req.body;
	try {
		const user = new User({ name, age });
		await user.save();

		return res.status(201).json({
			msg: "user created successfully",
			data: user,
		});
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			msg: "error creating user",
			error: error.message,
		});
	}
};

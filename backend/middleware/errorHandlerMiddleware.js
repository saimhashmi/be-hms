import ErrorHandler from "../utils/errorHandler.js";

const errorHandlerMiddleware = (err, req, res, next) => {
	console.error(`[Error] ${req.method} ${req.originalUrl}`, err);

	if (err instanceof ErrorHandler) {
		return res.status(err.statusCode).json({
			success: false,
			msg: err.message,
		});
	}

	const isProduction = process.env.NODE_ENV === "production";
	const statusCode = err.statusCode || err.status || 500;

	return res.status(statusCode).json({
		success: false,
		msg:
			isProduction && statusCode === 500
				? "Internal server error."
				: err.message || "Something went wrong.",
	});
};

export default errorHandlerMiddleware;

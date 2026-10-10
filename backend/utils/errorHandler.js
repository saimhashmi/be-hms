export default class ErrorHandler extends Error {
	constructor(message, statusCode = 500, errors) {
		super(message);
		this.name = "ErrorHandler";
		this.statusCode = statusCode;
		if (errors !== undefined) {
			this.errors = errors;
		}

		// Captures the correct stack trace for debugging
		Error.captureStackTrace(this, this.constructor);
	}
}

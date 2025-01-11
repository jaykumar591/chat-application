class ApiError extends Error {
    constructor(statusCode, message = "failed") {
        super(message);
        this.statusCode = statusCode;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = new Error().stack;
        }
    }
}

export default ApiError;

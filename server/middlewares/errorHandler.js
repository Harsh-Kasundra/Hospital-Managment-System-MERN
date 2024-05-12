const { constant } = require("../constant");
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case constant.VALIDATION_ERROR:
            res.json({
                title: "Validation failed",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case constant.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case constant.UNAUTHORIZED_ERROR:
            res.json({
                title: "unauthorized",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case constant.FORBIDDEN_ERROR:
            res.json({
                title: "forbidden Error",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case constant.SERVER_ERROR:
            res.json({
                title: "Server Error",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        default:
            res.json({ message: err.message });
            console.log("No error, All Good");
            break;
    }
};

module.exports = errorHandler;

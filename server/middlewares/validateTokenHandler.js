const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateTokenStaff = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({ error: "User Is not Authorized" }); // Send error response and terminate
                return;
            }
            req.staff = decoded.staff;
            next(); // Proceed to the next middleware
        });
    } else {
        res.status(401).json({
            error: "User is not authenticated or token is not provided",
        }); // Send error response and terminate
    }
});

const validateTokenAdmin = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({ error: "User Is not Authorized" }); // Send error response and terminate
                return;
            }
            req.admin = decoded.admin;
            next(); // Proceed to the next middleware
        });
    } else {
        res.status(401).json({
            error: "User is not authenticated or token is not provided",
        }); // Send error response and terminate
    }
});

module.exports = { validateTokenStaff, validateTokenAdmin };

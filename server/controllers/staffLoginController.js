const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const Staff = require("../models/staffModel");
const bcrypt = require("bcrypt");

//@desc Login Staff
//@route POST /hms/staffLogin/login
//@Access Public
const loginStaff = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const staff = await Staff.findOne({ username });
    //compare password with hashed password
    if (staff && (await bcrypt.compare(password, staff.password))) {
        const accessToken = jwt.sign(
            {
                staff: {
                    username: staff.username,
                    id: staff._id,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "24h" }
        );
        res.status(200).json({succes:true, token:accessToken });
    } else {
        res.status(401);
        throw new Error("Username or password is invalid");
    }
});

//@desc Login Staff
//@route POST /hms/staffLogin/current
//@Access Public
const currentStaff = asyncHandler(async (req, res) => {
    res.json(req.staff)
});
module.exports = { loginStaff, currentStaff };

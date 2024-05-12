const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");
const bcrypt = require("bcrypt");

//@desc get Admin
//@route GET /hms/admin
//@Access Public
const getAdmin = asyncHandler(async (req, res) => {
    const admin = await Admin.find();
    res.status(200).json(admin);
});

//@desc Update Admin
//@route PUT /hms/admin/:id
//@access Public
const updateAdmin = asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
        res.status(404);
        throw new Error("Admin Not Found");
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedAdmin);
});

//@desc Login Admin
//@route POST /hms/adminLogin/login
//@Access Public
const loginAdmin = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const admin = await Admin.findOne({ username });
    //compare password with hashed password
    if (username == admin.username && password == admin.password) {
        const accessToken = jwt.sign(
            {
                admin: {
                    username: admin.username,
                    id: admin._id,
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

const currentAdmin = asyncHandler(async (req, res) => {
    res.json(req.admin)
});

const changePassword = asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.params.id);
    const prevPassword = req.body.prevPassword;

    if (!admin) {
        res.status(400);
        throw new Error("Admin not found");
    }

    if (prevPassword != admin.password) {
        res.status(400);
        throw new Error("Previous password is incorrect");
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(
        req.params.id,
        { password: req.body.password },
        { new: true }
    );

    res.status(200).json(updatedAdmin);
});

module.exports = { loginAdmin, getAdmin, updateAdmin,changePassword ,currentAdmin};

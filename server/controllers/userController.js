const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
//@desc Get All Users
//@route GET /hms/user
//@access Public
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

//@desc Create New User
//@route POST /hms/user
//@access Public
const createUser = asyncHandler(async (req, res) => {
    console.log("request body is :", req.body);
    const {
        firstName,
        lastName,
        age,
        dateOfBirth,
        gender,
        bloodGroup,
        contactNumber,
        email,
        address,
        appointmentDate,
        reasonForAppointment,
        doctorAttending,
        diagonosis,
        prescription,
        admitted,
        admissionDate,
        admissionRoom,
        dischargeDate,
    } = req.body;
    if (
        !firstName ||
        !lastName ||
        !email ||
        !contactNumber ||
        !address ||
        !age ||
        !gender ||
        !dateOfBirth
    ) {
        res.status(400);
        throw new Error(
            "First name, last name, email, contact number, DOB, and address are mandatory fields."
        );
    }
    const user = await User.create({
        firstName,
        lastName,
        age,
        dateOfBirth,
        gender,
        bloodGroup,
        contactNumber,
        email,
        address,
        appointmentDate,
        reasonForAppointment,
        doctorAttending,
        diagonosis,
        prescription,
        admitted,
        admissionDate,
        admissionRoom,
        dischargeDate,
    });
    res.status(201).json(user);
});

//@desc get User
//@route GET /hms/user/:id
//@access Public
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("User Not Found");
    }
    res.status(200).json(user);
});

//@desc Update User
//@route PUT /hms/user/:id
//@access Public
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("User Not Found");
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedUser);
});

//@desc Delete User
//@route DELETE /hms/user/:id
//@access Public
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error("User Not Found");
    }
    await user.deleteOne({ _id: user._id });
    res.status(200).json(user);
});

module.exports = { getUsers, createUser, updateUser, deleteUser, getUser };

const asyncHandler = require("express-async-handler");
const Staff = require("../models/staffModel");
const bcrypt = require("bcrypt");

//@desc get all Staff
//@route GET /hms/staff
//@Access Private
const getstaffs = asyncHandler(async (req, res) => {
    const staffs = await Staff.find();
    res.status(200).json(staffs);
});

//@desc Create New Staff
//@route POST /hms/staff
//@access Private
const createStaff = asyncHandler(async (req, res) => {
    console.log("request body is :", req.body);
    const {
        image,
        firstName,
        lastName,
        dateOfBirth,
        age,
        gender,
        contactNumber,
        email,
        address,
        role,
        specialization,
        salary,
        shift,
        department,
        joiningDate,
        qualification,
        experience,
    } = req.body;
    if (
        !firstName ||
        !lastName ||
        !email ||
        !contactNumber ||
        !address ||
        !age ||
        !gender ||
        !role ||
        !salary ||
        !department ||
        !joiningDate
    ) {
        res.status(400);
        throw new Error(
            "First name, last name, email, contact number,and address are mandatory fields."
        );
    }
    const setUsername = (fName, lName) => {
        username = fName.toLowerCase() + lName.toLowerCase();
        return username;
    };
    const setPassword = async (fname, lname) => {
        password = fname.toLowerCase() + lname.toLowerCase() + "@123";
        //hashing and password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        return hashedPassword;
    };
    const hashedPassword = await setPassword(firstName, lastName);
    const staff = await Staff.create({
        image: image,
        firstName,
        lastName,
        age,
        dateOfBirth,
        gender,
        contactNumber,
        email,
        address,
        role,
        specialization,
        salary,
        shift,
        department,
        joiningDate,
        qualification,
        experience,
        username: setUsername(firstName, lastName),
        password: hashedPassword,
    });
    res.status(201).json({
        id: staff._id,
        image: staff.image,
        firstName: staff.firstName,
        lastName: staff.lastName,
        age: staff.age,
        dateOfBirth: staff.dateOfBirth,
        gender: staff.gender,
        contactNumber: staff.contactNumber,
        email: staff.email,
        address: staff.address,
        role: staff.role,
        specialization: staff.specialization,
        salary: staff.salary,
        shift: staff.shift,
        department: staff.department,
        joiningDate: staff.joiningDate,
        qualification: staff.qualification,
        experience: staff.experience,
        username: staff.username,
    });
});

//@desc get Staff
//@route GET /hms/staff/:id
//@access Private
const getStaff = asyncHandler(async (req, res) => {
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
        res.status(404);
        throw new Error("Staff Not Found");
    }
    res.status(200).json(staff);
});

//@desc Update Staff
//@route PUT /hms/staff/:id
//@access Private
const updateStaff = asyncHandler(async (req, res) => {
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
        res.status(404);
        throw new Error("Staff Not Found");
    }

    const updatedStaff = await Staff.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedStaff);
});

//@desc Delete Staff
//@route DELETE /hms/staff/:id
//@access Private
const deleteStaff = asyncHandler(async (req, res) => {
    const staff = await Staff.findById(req.params.id);

    if (!staff) {
        res.status(404);
        throw new Error("Staff Not Found");
    }
    await staff.deleteOne({ _id: staff._id });
    res.status(200).json(staff);
});

//@desc get all Staff Names
//@route GET /hms/staff/names
//@Access Private
const getStaffNames = asyncHandler(async (req, res) => {
    const staffs = await Staff.find();
    const staffName = staffs.map(
        (staff) => `${staff.firstName} ${staff.lastName}`
    );
    res.status(200).json(staffName);
});

const changePassword = asyncHandler(async (req, res) => {
    const staff = await Staff.findById(req.params.id);
    const prevPassword = req.body.prevPassword;

    if (!staff) {
        res.status(400);
        throw new Error("Staff not found");
    }

    if (!(await bcrypt.compare(prevPassword, staff.password))) {
        res.status(400);
        throw new Error("Previous password is incorrect");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const updatedStaff = await Staff.findByIdAndUpdate(
        req.params.id,
        { password: hashedPassword },
        { new: true }
    );

    res.status(200).json(updatedStaff);
});

module.exports = {
    getStaff,
    getstaffs,
    createStaff,
    deleteStaff,
    updateStaff,
    getStaffNames,
    changePassword,
};

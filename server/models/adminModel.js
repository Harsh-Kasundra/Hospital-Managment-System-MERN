const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
    {
        image: {
            type: String,
            default: "../assets/user.png",
        },
        firstName: {
            type: String,
            required: [true, "First name is required"],
        },
        lastName: {
            type: String,
            required: [true, "Last name is required"],
        },
        dateOfBirth: {
            type: Date,
            required: [true, "DOB Is Required"],
        },
        age: {
            type: Number,
            required: [true, "Age is required"],
        },
        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
            required: [true, "Gender is required"],
        },
        contactNumber: {
            type: String,
            required: [true, "Contact number is required"],
            maxLength: [10, "Mobile number must be of 10 numbers"],
            minLength: [10, "Mobile number must be of 10 numbers"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: [true, "Email address is already register"],
        },
        address: {
            type: String,
            required: [true, "Address is required"],
        },
        specialization: {
            type: String,
        },
        salary: {
            type: Number,
            required: [true, "Salary is required"],
        },
        department: {
            type: String,
            required: [true, "Department is required"],
        },
        joiningDate: {
            type: Date,
            required: [true, "Joining date is required"],
        },
        qualification: {
            type: String,
        },
        experience: {
            type: Number,
        },
        username: {
            type: String,
            required: [true, "username Is Required"],
        },
        password: {
            type: String,
            required: [true, "Passsword is required"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Admin", adminSchema);

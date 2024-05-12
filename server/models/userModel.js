const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name is required"],
        },
        lastName: {
            type: String,
            required: [true, "Last name is required"],
        },
        age: {
            type: Number,
            required: [true, "Age is required"],
        },
        dateOfBirth: {
            type: Date,
            required: [true, "DOB Is Required"],
        },
        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
            required: [true, "Gender is required"],
        },
        bloodGroup: {
            type: String,
            enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        },
        contactNumber: {
            type: String,
            required: [true, "Contact number is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: [true, "Email Value Must Be Unique"],
        },
        address: {
            type: String,
            required: [true, "Address is required"],
        },
        appointmentDate: {
            type: Date,
            required: [true, "Appointment Date is Mandotory"],
        },
        reasonForAppointment: {
            type: String,
        },
        doctorAttending: {
            type: String,
            default: "None",
        },
        diagonosis: {
            type: String,
            default: "None",
        },
        prescription: {
            type: String,
            default: "None",
        },
        admitted: {
            type: Boolean,
            default: false,
        },
        admissionDate: {
            type: Date,
            defualt: null,
        },
        admissionRoom: {
            type: String,
            default: "None",
        },
        dischargeDate: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);

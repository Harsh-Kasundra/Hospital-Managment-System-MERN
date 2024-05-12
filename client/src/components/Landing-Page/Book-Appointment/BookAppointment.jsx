import React from "react";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./BookAppointment.css";
import Swal from "sweetalert2";

const BookAppointment = () => {
    const ref = useRef(null);
    const [data, setData] = useState({});
    const [gender, setGender] = useState("");
    const [ageError, setAgeError] = useState("");
    const [mobileError, setMobileError] = useState("");
    const navigate = useNavigate();
    const apiUrl = "http://localhost:8080/hms/user";

    //Setting Gender in Data
    const handleGenderChange = (e) => {
        const selectedGender = e.target.value;
        setGender(selectedGender);
        setData({
            ...data,
            gender: selectedGender,
        });
    };

    //API calling
    const handleSubmit = (e) => {
        if (ageError || mobileError) {
            console.log("Validation errors exist. Form submission halted.");
            return;
        }
        fetch(apiUrl, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jsonwebtoken")}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Network response was not ok.");
                }
            })
            .then((res) => {
                console.log("Response from server:", res);
                // Show SweetAlert for successful submission
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "Form submitted successfully.",
                }).then(() => {
                    navigate("/");
                });
            })
            .catch((err) => {
                console.error("Error during form submission:", err);
                // Show SweetAlert for error
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong. Please try again later.",
                }).then(() => {
                    navigate("/");
                });
            });
    };

    useEffect(() => {
        ref.current.click();
    }, []);

    return (
        <>
            <button
                type="button"
                className="btn btn-primary d-none"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                ref={ref}
            >
                Launch demo modal
            </button>
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" style={{ maxWidth: "80%" }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                            >
                                Book Appointment
                            </h1>
                            <button
                                onClick={() => {
                                    navigate("/");
                                }}
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="mx-2 my-3 book-addemp-main">
                                <div className="book-addpatient-form">
                                    <form className="form">
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="FirstName"
                                                        className="form-label text-secondary"
                                                    >
                                                        First Name
                                                    </label>
                                                    <span className="text-danger">
                                                        *
                                                    </span>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="FirstName"
                                                        placeholder="Enter First Name"
                                                        required
                                                        onChange={(e) => {
                                                            setData({
                                                                ...data,
                                                                firstName:
                                                                    e.target
                                                                        .value,
                                                            });
                                                            e.target.setCustomValidity(
                                                                ""
                                                            );
                                                        }}
                                                        onInvalid={(e) => {
                                                            e.target.setCustomValidity(
                                                                "Please enter your first name."
                                                            );
                                                        }}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="LastName"
                                                        className="form-label text-secondary"
                                                    >
                                                        Last Name
                                                    </label>
                                                    <span className="text-danger">
                                                        *
                                                    </span>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="LastName"
                                                        placeholder="Enter Last Name"
                                                        required
                                                        onChange={(e) => {
                                                            setData({
                                                                ...data,
                                                                lastName:
                                                                    e.target
                                                                        .value,
                                                            });
                                                        }}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="DOB"
                                                        className="form-label text-secondary"
                                                    >
                                                        Date Of Birth
                                                    </label>
                                                    <span className="text-danger">
                                                        *
                                                    </span>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        id="DOB"
                                                        max="9999-12-31"
                                                        required
                                                        onChange={(e) => {
                                                            setData({
                                                                ...data,
                                                                dateOfBirth:
                                                                    e.target
                                                                        .value,
                                                            });
                                                        }}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="Age"
                                                        className="form-label text-secondary"
                                                    >
                                                        Age
                                                    </label>
                                                    <span className="text-danger">
                                                        *
                                                    </span>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id="Age"
                                                        required
                                                        placeholder="Enter Age"
                                                        onChange={(e) => {
                                                            const age =
                                                                e.target.value;
                                                            if (
                                                                age.length > 3
                                                            ) {
                                                                setAgeError(
                                                                    "Age cannot exceed 3 characters"
                                                                ); // Set error specifically for age input
                                                            } else {
                                                                setData({
                                                                    ...data,
                                                                    age,
                                                                });
                                                                setAgeError(""); // Clear the error if input is valid
                                                            }
                                                        }}
                                                    />
                                                    {ageError && (
                                                        <div className="error-message text-danger">
                                                            {ageError}
                                                        </div>
                                                    )}
                                                </div>
                                                <label className="form-label text-secondary mx-2">
                                                    Gender
                                                </label>
                                                <span className="text-danger">
                                                    *
                                                </span>
                                                <div className="mb-3">
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="gender"
                                                            id="inlineRadio1"
                                                            value="Male"
                                                            checked={
                                                                gender ===
                                                                "Male"
                                                            }
                                                            onChange={
                                                                handleGenderChange
                                                            }
                                                            required
                                                        />
                                                        <label
                                                            className="form-check-label text-secondary"
                                                            htmlFor="inlineRadio1"
                                                        >
                                                            Male
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="gender"
                                                            id="inlineRadio2"
                                                            value="Female"
                                                            checked={
                                                                gender ===
                                                                "Female"
                                                            }
                                                            onChange={
                                                                handleGenderChange
                                                            }
                                                            required
                                                        />
                                                        <label
                                                            className="form-check-label text-secondary"
                                                            htmlFor="inlineRadio2"
                                                        >
                                                            Female
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="gender"
                                                            id="inlineRadio3"
                                                            value="Other"
                                                            checked={
                                                                gender ===
                                                                "Other"
                                                            }
                                                            onChange={
                                                                handleGenderChange
                                                            }
                                                            required
                                                        />
                                                        <label
                                                            className="form-check-label text-secondary"
                                                            htmlFor="inlineRadio3"
                                                        >
                                                            Other
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="BloodGroup"
                                                        className="form-label text-secondary"
                                                    >
                                                        BloodGroup
                                                    </label>
                                                    <select
                                                        className="form-select"
                                                        id="BloodGroup"
                                                        required
                                                        onChange={(e) => {
                                                            setData({
                                                                ...data,
                                                                bloodGroup:
                                                                    e.target
                                                                        .value,
                                                            });
                                                            console.log(
                                                                e.target.value
                                                            );
                                                        }}
                                                    >
                                                        <option defaultValue>
                                                            Choose...
                                                        </option>
                                                        <option value="A+">
                                                            A+
                                                        </option>
                                                        <option value="A-">
                                                            A-
                                                        </option>
                                                        <option value="B+">
                                                            B+
                                                        </option>
                                                        <option value="B-">
                                                            B-
                                                        </option>
                                                        <option value="AB+">
                                                            AB+
                                                        </option>
                                                        <option value="AB-">
                                                            AB-
                                                        </option>
                                                        <option value="O+">
                                                            O+
                                                        </option>
                                                        <option value="O-">
                                                            O-
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="Email"
                                                        className="form-label text-secondary"
                                                    >
                                                        Email address
                                                    </label>
                                                    <span className="text-danger">
                                                        *
                                                    </span>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        id="Email"
                                                        placeholder="Enter E-mail"
                                                        required
                                                        onChange={(e) => {
                                                            setData({
                                                                ...data,
                                                                email: e.target
                                                                    .value,
                                                            });
                                                        }}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="Mobile"
                                                        className="form-label text-secondary"
                                                    >
                                                        Mobile No.
                                                    </label>
                                                    <span className="text-danger">
                                                        *
                                                    </span>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id="Mobile"
                                                        placeholder="Enter Contact"
                                                        required
                                                        onChange={(e) => {
                                                            const contactNumber =
                                                                e.target.value;
                                                            if (
                                                                contactNumber.length >
                                                                10
                                                            ) {
                                                                setMobileError(
                                                                    "Mobile No. cannot exceed 10 characters"
                                                                ); // Set error specifically for mobile number input
                                                            } else {
                                                                setData({
                                                                    ...data,
                                                                    contactNumber,
                                                                });
                                                                setMobileError(
                                                                    ""
                                                                ); // Clear the error if input is valid
                                                            }
                                                        }}
                                                    />
                                                    {mobileError && (
                                                        <div className="error-message text-danger">
                                                            {mobileError}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="Address"
                                                        className="form-label text-secondary"
                                                    >
                                                        Address
                                                    </label>
                                                    <span className="text-danger">
                                                        *
                                                    </span>
                                                    <textarea
                                                        className="form-control"
                                                        id="Address"
                                                        rows="2"
                                                        required
                                                        onChange={(e) => {
                                                            setData({
                                                                ...data,
                                                                address:
                                                                    e.target
                                                                        .value,
                                                            });
                                                        }}
                                                    ></textarea>
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="AppointmentDate"
                                                        className="form-label text-secondary"
                                                    >
                                                        Appointment Date
                                                    </label>
                                                    <span className="text-danger">
                                                        *
                                                    </span>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        id="AppointmentDate"
                                                        max="9999-12-31"
                                                        onChange={(e) => {
                                                            setData({
                                                                ...data,
                                                                appointmentDate:
                                                                    e.target
                                                                        .value,
                                                            });
                                                        }}
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="ReasoneForApointment"
                                                        className="form-label text-secondary"
                                                    >
                                                        Reasone for Appointment
                                                    </label>
                                                    <textarea
                                                        className="form-control"
                                                        id="ReasoneForApointment"
                                                        rows="1"
                                                        required
                                                        onChange={(e) => {
                                                            setData({
                                                                ...data,
                                                                reasonForAppointment:
                                                                    e.target
                                                                        .value,
                                                            });
                                                        }}
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                onClick={() => {
                                    navigate("/");
                                }}
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => {
                                    handleSubmit(data);
                                }}
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookAppointment;

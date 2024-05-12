import React, { useState } from "react";
import "./AdminAddEmployee.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AdminAddEmployee = () => {
    const [data, setData] = useState({});
    const [gender, setGender] = useState("");
    const [ageError, setAgeError] = useState("");
    const [mobileError, setMobileError] = useState("");
    const [salaryError, setSalaryError] = useState("");
    const navigate = useNavigate();
    const apiUrl = "http://localhost:8080/hms/staff";

    //Setting Gender in Data
    const handleGenderChange = (e) => {
        const selectedGender = e.target.value;
        setGender(selectedGender);
        setData({
            ...data,
            gender: selectedGender,
        });
    };

    //Setting up the image to base64 to upload in the database
    const convertToBase64 = (e) => {
        console.log(e);
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            console.log(reader.result);
            setData({ ...data, image: reader.result });
        };
        reader.onerror = (error) => {
            console.log("Error : ", error);
        };
    };

    //API calling
    const handleSubmit = (e) => {
        if (ageError || mobileError || salaryError) {
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
                    throw new Error("Failed to submit form");
                }
            })
            .then((res) => {
                // Show success message using SweetAlert
                Swal.fire({
                    icon: "success",
                    title: "Data submitted successfully",
                    timer: 1000,
                    onClose: () => {
                        navigate("/admin/add_employee");
                    },
                });
            })
            .catch((err) => {
                // Show error message using SweetAlert
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to submit form. Please try again later.",
                });
                console.error("Error submitting form:", err);
            });
    };

    return (
        <div>
            <div className=" mx-2 my-3 admin-addemp-main">
                <div className="admin-addemp-heading px-2">
                    <div className="admin-addemp-title">Add Employee</div>
                </div>
                <div className="admin-addemp-form">
                    <form className="form">
                        <p className="title">Register </p>
                        <div className="row">
                            <div className="col-6">
                                <div className="input-group mb-3">
                                    <label
                                        className="input-group-text"
                                        htmlFor="inputGroupFile01"
                                    >
                                        Upload Image
                                    </label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="inputGroupFile01"
                                        onChange={convertToBase64}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="FirstName"
                                        className="form-label text-secondary"
                                    >
                                        First Name
                                    </label>
                                    <span className="text-danger">*</span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="FirstName"
                                        placeholder="Enter First Name"
                                        required
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                firstName: e.target.value,
                                            });
                                            e.target.setCustomValidity("");
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
                                    <span className="text-danger">*</span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="LastName"
                                        placeholder="Enter Last Name"
                                        required
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                lastName: e.target.value,
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
                                    <span className="text-danger">*</span>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="DOB"
                                        max="9999-12-31"
                                        required
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                dateOfBirth: e.target.value,
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
                                    <span className="text-danger">*</span>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="Age"
                                        maxLength={3}
                                        required
                                        placeholder="Enter Age"
                                        onChange={(e) => {
                                            const age = e.target.value;
                                            if (age.length > 3) {
                                                setAgeError(
                                                    "Age cannot exceed 3 characters"
                                                ); // Set error specifically for age input
                                            } else {
                                                setData({ ...data, age });
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
                                <span className="text-danger">*</span>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="gender"
                                        id="inlineRadio1"
                                        value="Male"
                                        checked={gender === "Male"}
                                        onChange={handleGenderChange}
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
                                        checked={gender === "Female"}
                                        onChange={handleGenderChange}
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
                                        checked={gender === "Other"}
                                        onChange={handleGenderChange}
                                        required
                                    />
                                    <label
                                        className="form-check-label text-secondary"
                                        htmlFor="inlineRadio3"
                                    >
                                        Other
                                    </label>
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="Email"
                                        className="form-label text-secondary"
                                    >
                                        Email address
                                    </label>
                                    <span className="text-danger">*</span>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="Email"
                                        placeholder="Enter E-mail"
                                        required
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                email: e.target.value,
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
                                    <span className="text-danger">*</span>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="Mobile"
                                        placeholder="Enter Contact"
                                        maxLength={10}
                                        required
                                        onChange={(e) => {
                                            const contactNumber =
                                                e.target.value;
                                            if (contactNumber.length > 10) {
                                                setMobileError(
                                                    "Mobile No. cannot exceed 10 characters"
                                                ); // Set error specifically for mobile number input
                                            } else {
                                                setData({
                                                    ...data,
                                                    contactNumber,
                                                });
                                                setMobileError(""); // Clear the error if input is valid
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
                                    <span className="text-danger">*</span>
                                    <textarea
                                        className="form-control"
                                        id="Address"
                                        rows="3"
                                        required
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                address: e.target.value,
                                            });
                                        }}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="input-group mb-3">
                                    <label
                                        className="input-group-text"
                                        htmlFor="Role"
                                    >
                                        Role
                                    </label>
                                    <select
                                        className="form-select"
                                        id="Role"
                                        required
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                role: e.target.value,
                                            });
                                            console.log(e.target.value);
                                        }}
                                    >
                                        <option defaultValue>Choose...</option>
                                        <option value="Doctor">Doctor</option>
                                        <option value="Nurse">Nurse</option>
                                        <option value="Receptionist">
                                            Receptionist
                                        </option>
                                    </select>
                                    <span className="text-danger">*</span>
                                </div>
                                <div className="input-group mb-3">
                                    <label
                                        className="input-group-text"
                                        htmlFor="Shift"
                                    >
                                        Shift
                                    </label>
                                    <select
                                        className="form-select"
                                        id="Shift"
                                        required
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                shift: e.target.value,
                                            });
                                        }}
                                    >
                                        <option defaultValue>Choose...</option>
                                        <option value="Day">Day</option>
                                        <option value="Night">Night</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="Specialization"
                                        className="form-label text-secondary"
                                    >
                                        Specialization
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Specialization"
                                        placeholder="Enter Specialization"
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                specialization: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="Salary"
                                        className="form-label text-secondary"
                                    >
                                        Salary
                                    </label>
                                    <span className="text-danger">*</span>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="Salary"
                                        placeholder="Enter Salary"
                                        maxLength={7}
                                        required
                                        onChange={(e) => {
                                            const salary = e.target.value;
                                            if (salary.length > 7) {
                                                setSalaryError(
                                                    "Salary cannot exceed 7 characters"
                                                ); // Set error specifically for salary input
                                            } else {
                                                setData({ ...data, salary });
                                                setSalaryError(""); // Clear the error if input is valid
                                            }
                                        }}
                                    />
                                    {salaryError && (
                                        <div className="error-message text-danger">
                                            {salaryError}
                                        </div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="Department"
                                        className="form-label text-secondary"
                                    >
                                        Department
                                    </label>
                                    <span className="text-danger">*</span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Department"
                                        placeholder="Enter Department"
                                        required
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                department: e.target.value,
                                            });
                                        }}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label
                                        htmlFor="JoiningDate"
                                        className="form-label text-secondary"
                                    >
                                        Joining Date
                                    </label>
                                    <span className="text-danger">*</span>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="JoiningDate"
                                        max="9999-12-31"
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                joiningDate: e.target.value,
                                            });
                                        }}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="Qualification"
                                        className="form-label text-secondary"
                                    >
                                        Qualification
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Qualification"
                                        placeholder="Enter Qualification"
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                qualification: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="Experience"
                                        className="form-label text-secondary"
                                    >
                                        Experience
                                    </label>
                                    <input
                                        type="Number"
                                        className="form-control"
                                        id="Experience"
                                        placeholder="Enter Experience in yrs"
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                experience: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className="d-flex justify-content-end">
                                    <div className="d-flex justify-content-end">
                                        <button
                                            className="admin-addemp-btn d-flex justify-content-center my-4"
                                            onClick={handleSubmit}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminAddEmployee;

import React, { useEffect, useState } from "react";
import "./AdminAddpatient.css";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";

const AdminAddPatient = () => {
    const [data, setData] = useState({});
    const [gender, setGender] = useState("");
    const [ageError, setAgeError] = useState("");
    const [mobileError, setMobileError] = useState("");
    const [checked, setChecked] = useState(false);
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
                    throw new Error("Failed to submit form");
                }
            })
            .then((data) => {
                navigate("/admin/add_patient");
                Swal.fire({
                    icon: "success",
                    title: "Data updated successfully",
                    timer: 1000,
                }).then(() => {});
            })
            .catch((error) => {
                // Show error message using SweetAlert
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to submit form. Please try again later.",
                });
                console.error("Error submitting form:", error);
            });
    };

    //Fetching all the staff/doctors names to put in option
    const [docData, setDocData] = useState({
        doctorAttending: "", // Initialize state for selected doctor
        doctors: [], // Initialize state for storing doctors data
    });
    const fetchDoctors = async () => {
        try {
            const response = await fetch(
                "http://localhost:8080/hms/staff/names",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "jsonwebtoken"
                        )}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            const doctorsData = await response.json();
            setDocData((prevState) => ({ ...prevState, doctors: doctorsData }));
        } catch (error) {
            console.error("Error fetching doctors data:", error);
        }
    };
    useEffect(() => {
        fetchDoctors();
    }, []);

    return (
        <div>
            <div className=" mx-2 my-3 admin-addemp-main">
                <div className="admin-addemp-heading px-2">
                    <div className="admin-addemp-title">Add Patient</div>
                </div>
                <div className="admin-addpatient-form">
                    <form className="form">
                        <p className="title">Register Patient </p>
                        <div className="row">
                            <div className="col-6">
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
                                <div className="mb-3">
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
                                                bloodGroup: e.target.value,
                                            });
                                            console.log(e.target.value);
                                        }}
                                    >
                                        <option defaultValue>Choose...</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                    </select>
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
                                        rows="2"
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
                                <div className="mb-3">
                                    <label
                                        htmlFor="AppointmentDate"
                                        className="form-label text-secondary"
                                    >
                                        Appointment Date
                                    </label>
                                    <span className="text-danger">*</span>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="AppointmentDate"
                                        max="9999-12-31"
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                appointmentDate: e.target.value,
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
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                reasonForAppointment:
                                                    e.target.value,
                                            });
                                        }}
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="DoctorAttending"
                                        className="form-label text-secondary"
                                    >
                                        Doctor Attending
                                    </label>
                                    <select
                                        className="form-select"
                                        id="DoctorAttending"
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                doctorAttending: e.target.value,
                                            });
                                        }}
                                    >
                                        <option defaultValue>Choose...</option>
                                        {docData.doctors.map(
                                            (doctor, index) => (
                                                <option
                                                    key={index}
                                                    value={doctor}
                                                >
                                                    {doctor}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="Diagonosis"
                                        className="form-label text-secondary"
                                    >
                                        Diagonosis
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Diagonosis"
                                        placeholder="Diagonosis"
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                diagonosis: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="Prescription"
                                        className="form-label text-secondary"
                                    >
                                        Prescription / Medicines
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="Prescription"
                                        rows="1"
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                prescription: e.target.value,
                                            });
                                        }}
                                    ></textarea>
                                </div>
                                <div className="mb-2 mt-3 mx-2 d-flex align-items-start gap-3">
                                    <label
                                        htmlFor="Admitted"
                                        className="form-label text-dark fw-semibold"
                                    >
                                        Admitted
                                    </label>
                                    <label class="checkbox-container ">
                                        <input
                                            type="checkbox"
                                            id="Admitted"
                                            checked={checked}
                                            onChange={(e) => {
                                                const isChecked =
                                                    e.target.checked;
                                                setChecked(isChecked);
                                                setData({
                                                    ...data,
                                                    admitted: isChecked
                                                        ? true
                                                        : false,
                                                });
                                            }}
                                        />
                                        <span class="checkmark"></span>
                                    </label>
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="AdmissionDate"
                                        className="form-label text-secondary"
                                    >
                                        Admission Date
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="AdmissionDate"
                                        max="9999-12-31"
                                        disabled={!checked}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                admissionDate: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="AdmissionRoom"
                                        className="form-label text-secondary"
                                    >
                                        Admission Room
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="AdmissionRoom"
                                        disabled={!checked}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                admissionRoom: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className="">
                                    <label
                                        htmlFor="DischargeDate"
                                        className="form-label text-secondary"
                                    >
                                        Discharge Date
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="DischargeDate"
                                        max="9999-12-31"
                                        disabled={!checked}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                dischargeDate: e.target.value,
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

export default AdminAddPatient;

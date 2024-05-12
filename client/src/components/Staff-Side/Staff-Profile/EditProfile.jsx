import React from "react";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditProfile = () => {
    const ref = useRef(null);
    const apiUrl = "http://localhost:8080/hms/staff";
    const navigate = useNavigate();
    const { id } = useParams();
    const [data2, setData2] = useState({});
    const [gender, setGender] = useState("");
    const [ageError, setAgeError] = useState("");
    const [mobileError, setMobileError] = useState("");
    const [salaryError, setSalaryError] = useState("");

    //Calling API to Handle the edit and edit data in database
    useEffect(() => {
        ref.current.click();
        fetch(apiUrl + "/" + id, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jsonwebtoken")}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                return res.json();
            })
            .then((res) => {
                setData2(res);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [id]);

    const updateData = () => {
        if (ageError || mobileError || salaryError) {
            console.log("Validation errors exist. Form submission halted.");
            return;
        }
        fetch(apiUrl + "/" + id, {
            method: "PUT",
            body: JSON.stringify(data2),
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jsonwebtoken")}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (res.ok) {
                    // Show success message using SweetAlert
                    Swal.fire({
                        icon: "success",
                        title: "Data updated successfully",
                        timer: 1000,
                    }).then(() => {
                        navigate("/staff/profile");
                    });
                } else {
                    throw new Error("Failed to update data");
                }
            })
            .catch((error) => {
                // Show error message using SweetAlert
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to update data. Please try again later.",
                });
                console.error("Error updating data:", error);
            });
    };

    const handleGenderChange = (e) => {
        const selectedGender = e.target.value;
        setGender(selectedGender);
        setData2({
            ...data2,
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
            setData2({ ...data2, image: reader.result });
        };
        reader.onerror = (error) => {
            console.log("Error : ", error);
        };
    };

    return (
        <>
            <button
                type="button"
                class="btn btn-primary d-none"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                ref={ref}
            >
                Launch demo modal
            </button>

            <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog" style={{ maxWidth: "80%" }}>
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">
                                Edit Detials
                            </h1>
                            <button
                                onClick={() => {
                                    navigate("/staff/profile");
                                }}
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div class="modal-body">
                            <div>
                                <div className=" mx-2 my-3 admin-addemp-main">
                                    <div className="admin-addemp-form">
                                        <form className="form">
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
                                                            onChange={
                                                                convertToBase64
                                                            }
                                                        />
                                                    </div>
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
                                                            value={
                                                                data2.firstName
                                                            }
                                                            placeholder="Enter First Name"
                                                            required
                                                            onChange={(e) => {
                                                                setData2({
                                                                    ...data2,
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
                                                            value={
                                                                data2.lastName
                                                            }
                                                            placeholder="Enter Last Name"
                                                            required
                                                            onChange={(e) => {
                                                                setData2({
                                                                    ...data2,
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
                                                            value={
                                                                data2.dateOfBirth
                                                            }
                                                            required
                                                            onChange={(e) => {
                                                                setData2({
                                                                    ...data2,
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
                                                            type="text"
                                                            className="form-control"
                                                            id="Age"
                                                            value={data2.age}
                                                            maxLength={3}
                                                            required
                                                            placeholder="Enter Age"
                                                            onChange={(e) => {
                                                                const inputNumber =
                                                                    e.target
                                                                        .value;
                                                                const formattedNumber =
                                                                    inputNumber.replace(
                                                                        /\D/g,
                                                                        ""
                                                                    );
                                                                if (
                                                                    formattedNumber.length <=
                                                                    3
                                                                ) {
                                                                    setData2({
                                                                        ...data2,
                                                                        age: formattedNumber,
                                                                    });
                                                                    setAgeError(
                                                                        ""
                                                                    );
                                                                } else {
                                                                    setAgeError(
                                                                        "Age is invalid"
                                                                    );
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
                                                            value={data2.email}
                                                            placeholder="Enter E-mail"
                                                            required
                                                            onChange={(e) => {
                                                                setData2({
                                                                    ...data2,
                                                                    email: e
                                                                        .target
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
                                                            value={
                                                                data2.contactNumber
                                                            }
                                                            placeholder="Enter Contact"
                                                            required
                                                            onChange={(e) => {
                                                                const contactNumber =
                                                                    e.target
                                                                        .value;
                                                                if (
                                                                    contactNumber.length >
                                                                    10
                                                                ) {
                                                                    setMobileError(
                                                                        "Mobile No. cannot exceed 10 characters"
                                                                    ); // Set error specifically for mobile number input
                                                                } else {
                                                                    setData2({
                                                                        ...data2,
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
                                                            value={
                                                                data2.address
                                                            }
                                                            rows="3"
                                                            required
                                                            onChange={(e) => {
                                                                setData2({
                                                                    ...data2,
                                                                    address:
                                                                        e.target
                                                                            .value,
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
                                                            value={data2.role}
                                                            required
                                                            onChange={(e) => {
                                                                setData2({
                                                                    ...data2,
                                                                    role: e
                                                                        .target
                                                                        .value,
                                                                });
                                                            }}
                                                        >
                                                            <option
                                                                defaultValue
                                                            >
                                                                Choose...
                                                            </option>
                                                            <option value="Doctor">
                                                                Doctor
                                                            </option>
                                                            <option value="Nurse">
                                                                Nurse
                                                            </option>
                                                            <option value="Receptionist">
                                                                Receptionist
                                                            </option>
                                                        </select>
                                                        <span className="text-danger">
                                                            *
                                                        </span>
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
                                                            value={data2.shift}
                                                            onChange={(e) => {
                                                                setData2({
                                                                    ...data2,
                                                                    shift: e
                                                                        .target
                                                                        .value,
                                                                });
                                                                console.log(
                                                                    e.target
                                                                        .value
                                                                );
                                                            }}
                                                        >
                                                            <option
                                                                defaultValue
                                                            >
                                                                Choose...
                                                            </option>
                                                            <option value="Day">
                                                                Day
                                                            </option>
                                                            <option value="Night">
                                                                Night
                                                            </option>
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
                                                            value={
                                                                data2.specialization
                                                            }
                                                            placeholder="Enter Specialization"
                                                            onChange={(e) => {
                                                                setData2({
                                                                    ...data2,
                                                                    specialization:
                                                                        e.target
                                                                            .value,
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
                                                        <span className="text-danger">
                                                            *
                                                        </span>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="Salary"
                                                            value={data2.salary}
                                                            maxLength={7}
                                                            placeholder="Enter Salary"
                                                            required
                                                            onChange={(e) => {
                                                                const inputNumber =
                                                                    e.target
                                                                        .value;
                                                                const formattedNumber =
                                                                    inputNumber.replace(
                                                                        /\D/g,
                                                                        ""
                                                                    );
                                                                if (
                                                                    formattedNumber.length <=
                                                                    7
                                                                ) {
                                                                    setData2({
                                                                        ...data2,
                                                                        age: formattedNumber,
                                                                    });
                                                                    setSalaryError(
                                                                        ""
                                                                    );
                                                                } else {
                                                                    setSalaryError(
                                                                        "Salary is invalid"
                                                                    );
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
                                                        <span className="text-danger">
                                                            *
                                                        </span>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="Department"
                                                            value={
                                                                data2.department
                                                            }
                                                            placeholder="Enter Department"
                                                            required
                                                            onChange={(e) => {
                                                                setData2({
                                                                    ...data2,
                                                                    department:
                                                                        e.target
                                                                            .value,
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
                                                        <span className="text-danger">
                                                            *
                                                        </span>
                                                        <input
                                                            type="date"
                                                            className="form-control"
                                                            id="JoiningDate"
                                                            value={
                                                                data2.joiningDate
                                                            }
                                                            onChange={(e) => {
                                                                setData2({
                                                                    ...data2,
                                                                    joiningDate:
                                                                        e.target
                                                                            .value,
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
                                                            value={
                                                                data2.qualification
                                                            }
                                                            placeholder="Enter Qualification"
                                                            onChange={(e) => {
                                                                setData2({
                                                                    ...data2,
                                                                    qualification:
                                                                        e.target
                                                                            .value,
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
                                                            value={
                                                                data2.experience
                                                            }
                                                            placeholder="Enter Experience in yrs"
                                                            onChange={(e) => {
                                                                setData2({
                                                                    ...data2,
                                                                    experience:
                                                                        e.target
                                                                            .value,
                                                                });
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button
                                onClick={() => {
                                    navigate("/staff/profile");
                                }}
                                type="button"
                                class="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => {
                                    updateData(data2._id);
                                }}
                                type="button"
                                class="btn btn-primary"
                                data-bs-dismiss="modal"
                            >
                                Update changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditProfile;

import React from "react";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditPatient = () => {
    const ref = useRef(null);
    const apiUrl = "http://localhost:8080/hms/user";
    const navigate = useNavigate();
    const { id } = useParams();
    const [data2, setData2] = useState({});
    const [gender, setGender] = useState("");
    const [ageError, setAgeError] = useState("");
    const [mobileError, setMobileError] = useState("");
    const [checked, setChecked] = useState(false);

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

    //upadating the Edited Data
    const updateData = () => {
        if (ageError || mobileError) {
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
                    return res.json();
                } else {
                    throw new Error("Failed to update data");
                }
            })
            .then((data) => {
                Swal.fire({
                    icon: "success",
                    title: "Data updated successfully",
                    timer: 1000,
                });
                // Navigate to the desired location
                navigate("/admin/registered_patients");
            })
            .catch((error) => {
                // Show error message using SweetAlert
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.message,
                });
            });
    };

    //handelling the gender inputs
    const handleGenderChange = (e) => {
        const selectedGender = e.target.value;
        setGender(selectedGender);
        setData2({
            ...data2,
            gender: selectedGender,
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
                                    navigate("/admin/registered_patients");
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
                                                            max="9999-12-31"
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
                                                            type="number"
                                                            className="form-control"
                                                            id="Age"
                                                            value={data2.age}
                                                            required
                                                            placeholder="Enter Age"
                                                            onChange={(e) => {
                                                                const age =
                                                                    e.target
                                                                        .value;
                                                                if (
                                                                    age.length >
                                                                    3
                                                                ) {
                                                                    setAgeError(
                                                                        "Age cannot exceed 3 characters"
                                                                    ); // Set error specifically for age input
                                                                } else {
                                                                    setData2({
                                                                        ...data2,
                                                                        age,
                                                                    });
                                                                    setAgeError(
                                                                        ""
                                                                    ); // Clear the error if input is valid
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
                                                            htmlFor="BloodGroup"
                                                            className="form-label text-secondary"
                                                        >
                                                            BloodGroup
                                                        </label>
                                                        <select
                                                            className="form-select"
                                                            id="BloodGroup"
                                                            value={
                                                                data2.bloodGroup
                                                            }
                                                            required
                                                            onChange={(e) => {
                                                                setData2({
                                                                    ...data2,
                                                                    bloodGroup:
                                                                        e.target
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
                                                            rows="2"
                                                            value={
                                                                data2.address
                                                            }
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
                                                            value={
                                                                data2.appointmentDate
                                                                    ? new Date(
                                                                          data2.appointmentDate
                                                                      )
                                                                          .toISOString()
                                                                          .split(
                                                                              "T"
                                                                          )[0]
                                                                    : ""
                                                            }
                                                            max="9999-12-31"
                                                            onChange={(e) => {
                                                                setData2({
                                                                    ...data2,
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
                                                            Reasone for
                                                            Appointment
                                                        </label>
                                                        <textarea
                                                            className="form-control"
                                                            id="ReasoneForApointment"
                                                            value={
                                                                data2.reasonForAppointment
                                                            }
                                                            rows="1"
                                                            required
                                                            onChange={(e) => {
                                                                setData2({
                                                                    ...data2,
                                                                    reasonForAppointment:
                                                                        e.target
                                                                            .value,
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
                                                            required
                                                            onChange={(e) => {
                                                                setData2({
                                                                    ...data2,
                                                                    doctorAttending:
                                                                        e.target
                                                                            .value,
                                                                });
                                                            }}
                                                        >
                                                            <option
                                                                defaultValue
                                                            >
                                                                Choose...
                                                            </option>
                                                            {docData.doctors.map(
                                                                (
                                                                    doctor,
                                                                    index
                                                                ) => (
                                                                    <option
                                                                        key={
                                                                            index
                                                                        }
                                                                        value={
                                                                            doctor
                                                                        }
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
                                                            value={
                                                                data2.diagonosis
                                                            }
                                                            placeholder="Diagonosis"
                                                            required
                                                            onChange={(e) => {
                                                                setData2({
                                                                    ...data2,
                                                                    diagonosis:
                                                                        e.target
                                                                            .value,
                                                                });
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label
                                                            htmlFor="Prescription"
                                                            className="form-label text-secondary"
                                                        >
                                                            Prescription /
                                                            Medicines
                                                        </label>
                                                        <textarea
                                                            className="form-control"
                                                            id="prescription"
                                                            value={
                                                                data2.prescription
                                                            }
                                                            rows="1"
                                                            required
                                                            onChange={(e) => {
                                                                setData2({
                                                                    ...data2,
                                                                    prescription:
                                                                        e.target
                                                                            .value,
                                                                });
                                                            }}
                                                        ></textarea>
                                                    </div>
                                                    <div className="mb-3 mt-4 mx-2 d-flex align-items-start gap-3">
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
                                                                checked={
                                                                    data2.admitted
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    const isChecked =
                                                                        e.target
                                                                            .checked;
                                                                    setChecked(
                                                                        isChecked
                                                                    );
                                                                    setData2({
                                                                        ...data2,
                                                                        admitted:
                                                                            isChecked
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
                                                            value={
                                                                data2.admissionDate
                                                                    ? new Date(
                                                                          data2.admissionDate
                                                                      )
                                                                          .toISOString()
                                                                          .split(
                                                                              "T"
                                                                          )[0]
                                                                    : ""
                                                            }
                                                            max="9999-12-31"
                                                            disabled={
                                                                !data2.admitted
                                                            }
                                                            onChange={(e) => {
                                                                setData2({
                                                                    ...data2,
                                                                    admissionDate:
                                                                        e.target
                                                                            .value,
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
                                                            value={
                                                                data2.admissionDate
                                                                    ? new Date(
                                                                          data2.admissionDate
                                                                      )
                                                                          .toISOString()
                                                                          .split(
                                                                              "T"
                                                                          )[0]
                                                                    : ""
                                                            }
                                                            disabled={
                                                                !data2.admitted
                                                            }
                                                            onChange={(e) => {
                                                                setData2({
                                                                    ...data2,
                                                                    admissionRoom:
                                                                        e.target
                                                                            .value,
                                                                });
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="mb-3">
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
                                                            value={
                                                                data2.dischargeDate
                                                                    ? new Date(
                                                                          data2.dischargeDate
                                                                      )
                                                                          .toISOString()
                                                                          .split(
                                                                              "T"
                                                                          )[0]
                                                                    : ""
                                                            }
                                                            max="9999-12-31"
                                                            disabled={
                                                                !data2.admitted
                                                            }
                                                            onChange={(e) => {
                                                                setData2({
                                                                    ...data2,
                                                                    dischargeDate:
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
                                    navigate("/admin/registered_patients");
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

export default EditPatient;

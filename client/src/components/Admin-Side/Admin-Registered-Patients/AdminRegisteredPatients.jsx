import React, { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useNavigate } from "react-router-dom";
import "./AdminRegisteredpatients.css";
import Swal from "sweetalert2";

const AdminRegisteredPatients = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const animatedComponents = makeAnimated();
    const navigate = useNavigate();
    const apiUrl = "http://localhost:8080/hms/user";

    //Caling API to get all the data from the database
    useEffect(() => {
        fetch(apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jsonwebtoken")}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then((data) => {
                if (Array.isArray(data)) {
                    setData(data);
                    setFilteredData(data);
                } else {
                    console.error("Data fetched is not an array:", data);
                }
            })
            .catch((error) => console.error("Error fetching data:", error));

        fetchDoctors();
    }, []);

    //Calling API To delete the Patient from database
    const handleDelete = (id) => {
        // Display confirmation dialog using SweetAlert
        Swal.fire({
            icon: "warning",
            title: "Are you sure?",
            text: "You are about to delete this employee record. This action cannot be undone.",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            // Check if user confirms deletion
            if (result.isConfirmed) {
                // Proceed with deletion
                fetch(apiUrl + "/" + id, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "jsonwebtoken"
                        )}`,
                        "Content-Type": "application/json",
                    },
                })
                    .then((res) => {
                        // Check if deletion was successful
                        if (res.ok) {
                            // Show success message using SweetAlert
                            Swal.fire({
                                icon: "success",
                                title: "Deleted!",
                                text: "The employee record has been deleted.",
                            }).then(() => {
                                // Fetch updated data and update state
                                fetch(apiUrl)
                                    .then((res) => res.json())
                                    .then((data) => {
                                        setData(data);
                                        setFilteredData(data);
                                    })
                                    .catch((error) => {
                                        console.error(
                                            "Error fetching updated data:",
                                            error
                                        );
                                    });
                            });
                        } else {
                            // Show error message using SweetAlert if deletion failed
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: "Failed to delete the employee record. Please try again later.",
                            });
                        }
                    })
                    .catch((error) => {
                        // Show error message using SweetAlert if an error occurs during deletion
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "An error occurred while deleting the employee record. Please try again later.",
                        });
                        console.error("Error deleting employee:", error);
                    });
            }
        });
    };

    //Fetching all the staff/doctors names to put in option
    const [docData, setDocData] = useState({
        doctorAttending: "", // Initialize state for selected doctor
        doctors: [], // Initialize state for storing doctors data
        doctornames: [], // Initialize state for storing patient data
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
            const patientsArray = doctorsData.map((doctor) => ({
                value: doctor,
                label: doctor,
            }));
            setDocData((prevState) => ({
                ...prevState,
                doctors: doctorsData,
                doctornames: patientsArray,
            }));
        } catch (error) {
            console.error("Error fetching doctors data:", error);
        }
    };

    //Displaying the Patient List
    const PatientTable = (id) => {
        if (!filteredData || filteredData.length === 0) {
            return (
                <tbody>
                    <tr>
                        <td colSpan="7">No Patient data available</td>
                    </tr>
                </tbody>
            );
        }
        const tableRows = data.map((patient, index) => {
            return (
                <tr key={patient._id}>
                    <td>
                        {" "}
                        {patient.firstName} {patient.lastName}
                    </td>
                    <td>{patient.contactNumber}</td>
                    <td>{patient.doctorAttending}</td>
                    <td>{patient.address}</td>
                    <td>
                        {patient.appointmentDate
                            ? new Date(
                                  patient.appointmentDate
                              ).toLocaleDateString()
                            : "N/A"}
                    </td>
                    <td>
                        {patient.admitted && <span> Yes </span>}
                        {!patient.admitted && <span> No </span>}
                    </td>
                    <td className="d-flex justify-content-evenly gap-2">
                        <button
                            className="table-delete-btn pt-2"
                            onClick={() => {
                                handleDelete(patient._id);
                            }}
                        >
                            <svg
                                viewBox="0 0 15 17.5"
                                height="17.5"
                                width="15"
                                xmlns="http://www.w3.org/2000/svg"
                                className="table-delete-icon"
                            >
                                <path
                                    transform="translate(-2.5 -1.25)"
                                    fill="#29364c"
                                    d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z"
                                    id="Fill"
                                ></path>
                            </svg>
                        </button>
                        <button
                            className="table-edit-btn pt-2"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(
                                    "/admin/registered_patients/" + patient._id
                                );
                            }}
                        >
                            <svg
                                viewBox="0 0 512 512"
                                height="17.5"
                                width="15"
                                xmlns="http://www.w3.org/2000/svg"
                                className="table-edit-icon"
                            >
                                <path
                                    id="Fill"
                                    fill="#29364c"
                                    transform="translate(-2.5 -1.25)"
                                    d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                                ></path>
                            </svg>
                        </button>
                        <button
                            className="table-view-btn pt-2"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(
                                    "/admin/registered_patients/view/" +
                                        patient._id
                                );
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                height="17.5"
                                width="15"
                                className="table-view-icon"
                            >
                                <path
                                    id="Fill"
                                    fill="#29364c"
                                    transform="translate(-2.5 -1.25)"
                                    d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
                                />
                            </svg>
                        </button>
                    </td>
                </tr>
            );
        });
        return <tbody className="patient-table-body">{tableRows}</tbody>;
    };

    return (
        <div className="mx-2 my-3 admin-employee-main">
            <div className="admin-employee-heading px-2">
                <div className="admin-employee-title">Registered Patient</div>
                <div className="admin-employee-addbtn">
                    <button
                        className="admin-employee-btn"
                        onClick={() => {
                            navigate("/admin/add_patient");
                        }}
                    >
                        <span className="fw-semibold">Register patient</span>
                    </button>
                </div>
            </div>
            <div className="admin-patient-filter d-flex justify-content-between">
                <div className="InputContainer">
                    <input
                        type="text"
                        className="input"
                        id="input"
                        placeholder="Search here"
                        onChange={(e) => {
                            const searchTerm = e.target.value.toLowerCase();
                            const fildata = filteredData.filter((patient) => {
                                const fullName =
                                    `${patient.firstName} ${patient.lastName}`.toLowerCase();
                                return fullName.includes(searchTerm);
                            });
                            setData(fildata);
                        }}
                    />
                    <label htmlFor="input" className="labelforsearch">
                        <svg viewBox="0 0 512 512" className="searchIcon">
                            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
                        </svg>
                    </label>
                </div>
                <div className="admin-patient-docFilter">
                    <Select
                        isMulti
                        name="patient"
                        options={docData.doctornames}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        placeholder="Select Doctor"
                        components={animatedComponents}
                        onChange={(e) => {
                            const selectedOptions = e;
                            const selectedDoctorNames = selectedOptions.map(
                                (option) => option.label
                            );
                            const filteredPatientData = filteredData.filter(
                                (patient) => {
                                    const docNames = patient.doctorAttending;
                                    return docNames.includes(
                                        selectedDoctorNames
                                    );
                                }
                            );
                            setData(filteredPatientData);
                        }}
                    />
                </div>
            </div>
            <div className="admin-patient-display my-2 px-3 mt-4">
                <table className="patient-table-main">
                    <thead className="patient-table-head">
                        <tr>
                            <th className="patient-column">Patient</th>
                            <th className="contact-column">Contact</th>
                            <th className="email-column">Doctor Attending</th>
                            <th>Address</th>
                            <th className="appointment-column">
                                Appointment Date
                            </th>
                            <th className="addmited-column">Admitted</th>
                            <th className="action-column">Action</th>
                        </tr>
                    </thead>
                    <PatientTable />
                </table>
            </div>
        </div>
    );
};

export default AdminRegisteredPatients;

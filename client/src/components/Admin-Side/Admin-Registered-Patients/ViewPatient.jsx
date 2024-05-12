import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AdminRegisteredpatients.css";

const ViewPatient = () => {
    const [data, setData] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const apiUrl = "http://localhost:8080/hms/user";
    useEffect(() => {
        fetch(apiUrl + "/" + id, {
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
                setData(data);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, [id]);
    //Setting up updatedAt Date
    const currentDate = new Date(data.updatedAt);
    const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const monthIndex = currentDate.getMonth();
    const date = currentDate.getDate();
    const year = currentDate.getFullYear();
    const formattedDate = `${monthNames[monthIndex]} ${date} ${year}`;

    //Setting up the date For the Date of birth
    const DOB = new Date(data.dateOfBirth);
    const y = DOB.getFullYear();
    const m = DOB.getMonth() + 1;
    const d = DOB.getDate();

    const formatedDOB = `${y}-${m < 10 ? "0" + m : m}-${d < 10 ? "0" + d : d}`;

    console.log(formattedDate); // Output: "2024-03-24"

    return (
        <div className="mx-2 my-3 admin-employee-main">
            <div className="admin-employee-heading px-2">
                <div className="admin-employee-title">Patient Details</div>
                <div className="admin-employee-addbtn">
                    <button
                        className="admin-employee-btn"
                        onClick={() => {
                            navigate("/admin/registered_patients/" + id);
                        }}
                    >
                        <span className="fw-semibold">Edit Details</span>
                    </button>
                </div>
            </div>
            <div className="patient-detials-main d-flex">
                <div className="patient-detials">
                    <div className="heading">Patient Details</div>
                    <div className="data-heading">Name</div>
                    <div className="data-value">{`${data.firstName} ${data.lastName}`}</div>
                    <div className="data-heading">Age</div>
                    <div className="data-value">{data.age}</div>
                    <div className="data-heading">Date Of Birth</div>
                    <div className="data-value">{formatedDOB}</div>
                    <div className="data-heading">Gender</div>
                    <div className="data-value">{data.gender}</div>
                    <div className="data-heading">Mobile Number</div>
                    <div className="data-value">{data.contactNumber}</div>
                    <div className="data-heading">E-mail</div>
                    <div className="data-value">{data.email}</div>
                    <div className="data-heading">Address</div>
                    <div className="data-value">{data.address}</div>
                    <div className="data-heading">Blood Group</div>
                    <div className="data-value">{data.bloodGroup}</div>
                    <div className="data-heading">Last Modified</div>
                    <div className="data-value">{formattedDate}</div>
                </div>
                <div className="patient-med-info">
                    <div className="medinfo-upper">
                        <div className="d-flex">
                            <div
                                className="mb-5"
                                style={{ marginRight: "10rem" }}
                            >
                                <div className="data-heading">
                                    Patient Complaint
                                </div>
                                <div className="data-value">
                                    {data.reasonForAppointment}
                                </div>
                            </div>
                            <div>
                                <div className="data-heading">Status</div>
                                <div className="data-value">
                                    {data.admitted
                                        ? "Admitted"
                                        : "Not Admitted"}
                                </div>
                            </div>
                        </div>
                        <div className="d-flex">
                            <div
                                className="mb-5"
                                style={{ marginRight: "10rem" }}
                            >
                                <div className="data-heading">
                                    Doctor's Diagnosis
                                </div>
                                <div className="data-value">
                                    {data.diagonosis}
                                </div>
                            </div>
                            <div>
                                <div className="data-heading">
                                    Floor/Ward od Admission
                                </div>
                                <div className="data-value">
                                    {data.admissionRoom}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="medinfo-lower">
                        <div className="heading">Prescriptions / Medicines</div>
                        <div className="data-value">{data.prescription}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewPatient;

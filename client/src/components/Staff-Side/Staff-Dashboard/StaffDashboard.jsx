import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

import "./StaffDashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import patientIcon from "../../../assets/patient.png";
import todayPatient from "../../../assets/today-patient.png";
import appointment from "../../../assets/appointment.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const StaffDashboard = () => {
    const [data, setData] = useState([]);
    const [patientData, setPatientData] = useState([]);
    const [docData, setDocData] = useState({});
    const navigate = useNavigate();
    const apiUrl = "http://localhost:8080/hms/user";

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
    });

    useEffect(() => {
        Toast.fire({
            icon: "success",
            title: "Signed in successfully",
            customClass: {
                popup: "blue-toast-popup",
                icon: "blue-toast-icon",
                title: "blue-toast-title",
            },
        });
        // Fetch staff data
        fetch("http://localhost:8080/hms/staff/" + localStorage.getItem("id"), {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jsonwebtoken")}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return navigate("/staffLogin");
                }
            })
            .then((res) => {
                setDocData(res);
            })
            .catch((err) => {
                console.log("erorrrr", err);
                navigate("/staffLogin");
            });
    }, [navigate]);

    // Use another useEffect to filter patient data when docData changes
    // useEffect(() => {
    //     // Check if docData is available
    //     if (docData && docData.firstName && docData.lastName) {
    //         // Fetch patient data
    //         fetch(apiUrl, {
    //             method: "GET",
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem(
    //                     "jsonwebtoken"
    //                 )}`,
    //                 "Content-Type": "application/json",
    //             },
    //         })
    //             .then((res) => {
    //                 if (res.ok) {
    //                     return res.json();
    //                 } else {
    //                     return navigate("/staffLogin");
    //                 }
    //             })
    //             .then((data) => {
    //                 setData(data);
    //                 const currentDate = new Date();
    //                 currentDate.setHours(0, 0, 0, 0);
    //                 const todayPatients = data.filter((patient) => {
    //                     const appointmentDate = new Date(patient.appointmentDate);
    //                     appointmentDate.setHours(0, 0, 0, 0);
    //                     console.log("Appointment Date:", appointmentDate);
    //                     console.log("Current Date:", currentDate);
    //                     return (
    //                         appointmentDate.getTime() === currentDate.getTime() &&
    //                         patient.doctorAttending === `${docData.firstName} ${docData.lastName}`
    //                     );
    //                 });

    //                 setPatientData(todayPatients);
    //                 console.log(patientData);
    //             })
    //             .catch((err) => {
    //                 navigate("/staffLogin");
    //             });
    //     }
    // }, [docData, navigate, apiUrl]);
    useEffect(() => {
        // Check if docData is available
        if (docData && docData.firstName && docData.lastName) {
            // Fetch patient data
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "jsonwebtoken"
                    )}`,
                    "Content-Type": "application/json",
                },
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        return navigate("/staffLogin");
                    }
                })
                .then((data) => {
                    setData(data);
                    const currentDate = new Date();
                    currentDate.setHours(0, 0, 0, 0);
                    const todayPatients = data.filter((patient) => {
                        const appointmentDate = new Date(
                            patient.appointmentDate
                        );
                        appointmentDate.setHours(0, 0, 0, 0);
                        return (
                            appointmentDate.getTime() ===
                                currentDate.getTime() &&
                            patient.doctorAttending ===
                                `${docData.firstName} ${docData.lastName}` // Add space here
                        );
                    });
                    setPatientData(todayPatients);
                    console.log(todayPatients);
                })
                .catch((err) => {
                    navigate("/staffLogin");
                });
        }
    }, [docData, navigate, apiUrl]);

    //Setting date and month START
    const months = [
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
    const d = new Date();
    let month = months[d.getMonth()];
    function padTo2Digits(num) {
        return num.toString().padStart(2, "0");
    }
    function formatFullDate(date) {
        return [padTo2Digits(date.getDate()), month, date.getFullYear()].join(
            "-"
        );
    }
    function formatHalfDate(date) {
        return [month, date.getFullYear()].join(" ");
    }
    //Setting date and months END

    //React Google Chart STARTS
    const value = [
        ["Patients", "Per months"],
        ["New Patients", 5],
        ["Old Patients", 3],
        ["Total Patients", 8],
    ];
    const options = {
        pieHole: 0.4,
        height: 400,
        width: 520,
        is3D: false,
        backgroundColor: "#f4f4f4",
        colors: ["#D4DDFF", "#F4B843", "#0D46C1"],
    };
    //React Google Chart ENDS

    const PatientTable = (id) => {
        if (!patientData || patientData.length === 0) {
            return (
                <tbody>
                    <tr>
                        <td colSpan="7">No Patient data available</td>
                    </tr>
                </tbody>
            );
        }
        const tableRow = patientData.map((patient, index) => (
            <tr className=" my-3 ">
                <td>{`${patient.firstName} ${patient.lastName}`}</td>
                <td>{patient.contactNumber}</td>
                <td>{patient.reasonForAppointment}</td>
            </tr>
        ));
        return <tbody className="patient-dashboard-body">{tableRow}</tbody>;
    };

    //count of the admmited patient
    const admitted = () => {
        let admittedCount = 0;
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        for (const n of data) {
            const dischargeDate = new Date(n.dischargeDate);
            dischargeDate.setHours(0, 0, 0, 0);
            console.log(dischargeDate.getTime());
            if (
                (n.admitted && dischargeDate.getTime() <= 0) ||
                dischargeDate.getTime() > currentDate.getTime()
            ) {
                admittedCount++;
            }
        }
        return admittedCount;
    };

    //count todays appointment
    const appointmentCount = () => {
        let appointmentCount = patientData.length;
        return appointmentCount;
    };

    return (
        <>
            <div className="staff-dashboard-main">
                <div className="staff-dashboard-first my-3">
                    <div className="first-title">Dashboard</div>
                    <div className="first-icon">
                        <FontAwesomeIcon
                            icon="fa-regular fa-envelope"
                            style={{ color: "#000000" }}
                        />
                    </div>
                </div>
                <div className="staff-dashboard-second my-3">
                    <div className="second-total mx-1">
                        <div className="total-icon">
                            <img src={patientIcon} alt="" />
                        </div>
                        <div className="total-detial">
                            <div className="title">Total Patient</div>
                            <div className="amount">{data.length}</div>
                            <div className="subtitle">Till Today</div>
                        </div>
                    </div>
                    <div className="second-today mx-1">
                        <div className="today-icon">
                            <img src={todayPatient} alt="" />
                        </div>
                        <div className="today-detial">
                            <div className="title">Admitted Patient</div>
                            <div className="amount">{admitted()}</div>
                            <div className="subtitle">
                                {formatFullDate(new Date())}
                            </div>
                        </div>
                    </div>
                    <div className="second-appointment mx-1">
                        <div className="appointment-icon">
                            <img src={appointment} alt="" />
                        </div>
                        <div className="appointment-detial">
                            <div className="title">Today Appointment</div>
                            <div className="amount">{appointmentCount()}</div>
                            <div className="subtitle">
                                {formatFullDate(new Date())}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="staff-dashboard-third my-3">
                    <div className="third-status d-flex flex-column justify-content-center">
                        <div className="fs-5 fw-semibold px-4">
                            Patient Summary {formatHalfDate(new Date())}
                        </div>
                        <Chart
                            chartType="PieChart"
                            width="100%"
                            data={value}
                            options={options}
                        />
                    </div>
                    <div className="third-appointments">
                        <div className="fs-5 fw-semibold px-4 py-3">
                            Todays Appointment
                        </div>
                        <div className="table-dashboard-container">
                            <table className="patient-dashboard-main">
                                <thead className="patient-dashboard-head">
                                    <tr>
                                        <th className="patient-dashboard-name">
                                            Name
                                        </th>
                                        <th className="patient-dashboard-contact">
                                            Contact
                                        </th>
                                        <th className="patient-dashboard-doctor">
                                            Reason For Appointment
                                        </th>
                                    </tr>
                                </thead>
                                <PatientTable />
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StaffDashboard;
import "./StaffNavabar.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChartSimple,
    faBedPulse,
    faHospitalUser,
    faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";

const StaffNavbar = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const apiUrl = "http://localhost:8080/hms/staff";

    useEffect(() => {
        fetch(apiUrl + "/" + localStorage.getItem("id"), {
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
            .then((data) => {
                setData(data);
            })
            .catch((err) => {
                navigate("/staffLogin");
            });
    }, [navigate]);
    return (
        <>
            <div className="col-2 staff-navbar-main">
                <div className="staff-navbar-details">
                    <div className="staff-navbar-photo">
                        <img src={data.image} alt="" />
                    </div>
                    <div className="staff-navbar-name">{`${data.firstName} ${data.lastName}`}</div>
                    <div className="staff-navbar-edu">{data.qualification}</div>
                </div>
                <div className="staff-navbar-divider"></div>
                <div className="staff-navabar-list">
                    <ul className="staff-navbar-links">
                        <Link className="staff-navbar-link" to="/staff">
                            <FontAwesomeIcon icon={faChartSimple} />
                            <li>Dashboard</li>
                        </Link>
                        <Link
                            className="staff-navbar-link"
                            to="/staff/registered_patients"
                        >
                            <FontAwesomeIcon icon={faBedPulse} />
                            <li>Registered Patients</li>
                        </Link>
                        <Link
                            className="staff-navbar-link"
                            to="/staff/add_patient"
                        >
                            <FontAwesomeIcon icon={faHospitalUser} />
                            <li>Add Patient</li>
                        </Link>
                        <Link className="staff-navbar-link" to="/staff/profile">
                            <FontAwesomeIcon icon={faUserDoctor} />
                            <li>Profile</li>
                        </Link>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default StaffNavbar;

import "./AdminNavbar.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import avatar from "../../../assets/doctor-avatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChartSimple,
    faBedPulse,
    faHospitalUser,
    faUsers,
    faUserPlus,
    faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";

const AdminNavbar = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const apiUrl = "http://localhost:8080/hms/admin";

    useEffect(() => {
        fetch(apiUrl, {
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
                    console.log("navbar", res);
                    return navigate("/adminLogin");
                }
            })
            .then((data) => {
                setData(data[0]);
            })
            .catch((err) => {
                console.log("error in admin navbar : ", err);
            });
    }, [navigate]);
    return (
        <>
            <div className="col-2 admin-navbar-main">
                <div className="admin-navbar-details">
                    <div className="admin-navbar-photo">
                        <img src={avatar} alt="" />
                    </div>
                    <div className="admin-navbar-name">{`${data.firstName} ${data.lastName}`}</div>
                    <div className="admin-navbar-edu">
                        {data.qualification}
                    </div>
                </div>
                <div className="admin-navbar-divider"></div>
                <div className="admin-navabar-list">
                    <ul className="admin-navbar-links">
                        <Link className="admin-navbar-link" to="/admin">
                            <FontAwesomeIcon icon={faChartSimple} />
                            <li>Dashboard</li>
                        </Link>
                        <Link
                            className="admin-navbar-link"
                            to="/admin/registered_patients"
                        >
                            <FontAwesomeIcon icon={faBedPulse} />
                            <li>Registered Patients</li>
                        </Link>
                        <Link
                            className="admin-navbar-link"
                            to="/admin/add_patient"
                        >
                            <FontAwesomeIcon icon={faHospitalUser} />
                            <li>Add Patient</li>
                        </Link>
                        <Link
                            className="admin-navbar-link"
                            to="/admin/employees"
                        >
                            <FontAwesomeIcon icon={faUsers} />
                            <li>Employee</li>
                        </Link>
                        <Link
                            className="admin-navbar-link"
                            to="/admin/add_employee"
                        >
                            <FontAwesomeIcon icon={faUserPlus} />
                            <li>Add Employee</li>
                        </Link>
                        <Link className="admin-navbar-link" to="/admin/profile">
                            <FontAwesomeIcon icon={faUserDoctor} />
                            <li>Profile</li>
                        </Link>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default AdminNavbar;

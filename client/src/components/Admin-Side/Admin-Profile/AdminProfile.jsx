import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminProfile.css";
import img from "../../../assets/doctor-avatar.png";

const AdminProfile = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const apiUrl = "http://localhost:8080/hms/admin";

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
                return res.json();
            })
            .then((data) => {
                setData(data[0]);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    //setting up joining date
    const currentDate = new Date(data.joiningDate);
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

    console.log(formattedDate); // Output: "2024-03-24

    return (
        <div className="mx-2 my-3 admin-profile-main">
            <div className="admin-profile-heading px-2">
                <div className="admin-profile-title">Your Profile</div>
                <div className="d-flex gap-4">
                    <div className="admin-profile-addbtn">
                        <button
                            className="admin-profile-btn"
                            onClick={() => {
                                navigate("");
                            }}
                        >
                            <span className="fw-semibold">Change Password</span>
                        </button>
                    </div>
                    <div className="admin-profile-addbtn">
                        <button
                            className="admin-profile-btn"
                            onClick={() => {
                                navigate("/admin/profile/" + data._id);
                            }}
                        >
                            <span className="fw-semibold">Edit Profile</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="admin-profile-details d-flex">
                <div className="admin-profile-left">
                    <div className="profile-img">
                        <img src={img} alt="profilpic" />
                    </div>
                    <div className="pb-5">
                        <div className="profile-data-heading">Role</div>
                        <div className="profile-data-value"> Admin</div>
                    </div>
                    <div>
                        <div className="profile-data-heading">Joining Date</div>
                        <div className="profile-data-value">
                            {" "}
                            {formattedDate}
                        </div>
                    </div>
                </div>
                <div className="adimin-profile-right">
                    <div className="admin-profile-rightfirst">
                        <div>
                            <div className="profile-data-heading">
                                FULL NAME
                            </div>
                            <div className="profile-data-name">
                                {`${data.firstName} ${data.lastName}`}
                            </div>
                        </div>
                        <div className="d-flex justify-content-around">
                            <div>
                                <div className="profile-data-heading">
                                    DATE OF BIRTH
                                </div>
                                <div className="profile-data-value">
                                    {formatedDOB}
                                </div>
                                <div className="profile-data-value">
                                    {data.age} Years old
                                </div>
                            </div>
                            <div>
                                <div className="profile-data-heading">
                                    HOME ADDRESS
                                </div>
                                <div className="profile-data-value">
                                    {data.address}
                                </div>
                            </div>
                            <div>
                                <div className="profile-data-heading">
                                    CONTACT INFORMATION
                                </div>
                                <div className="profile-data-value">
                                    {data.contactNumber}
                                </div>
                                <div className="profile-data-value">
                                    {data.email}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="admin-profile-rightsecond">
                        <div className="profile-Heading">Study Information</div>
                        <div className="d-flex justify-content-around">
                            <div>
                                <div className="profile-data-heading">
                                    SPECIALIZATION
                                </div>
                                <div className="profile-data-value">
                                    {data.specialization}
                                </div>
                            </div>
                            <div>
                                <div className="profile-data-heading">
                                    QUALIFICATION
                                </div>
                                <div className="profile-data-value">
                                    {data.qualification}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="admin-profile-rightthisrd">
                        <div className="profile-Heading">Job Information</div>
                        <div className="d-flex justify-content-around">
                            <div>
                                <div className="profile-data-heading">
                                    EXPERIENCE
                                </div>
                                <div className="profile-data-value">
                                    {data.experience}
                                </div>
                            </div>
                            <div>
                                <div className="profile-data-heading">
                                    SALARY
                                </div>
                                <div className="profile-data-value">
                                    {data.salary}
                                </div>
                            </div>
                            <div>
                                <div className="profile-data-heading">
                                    DEPARTMENT
                                </div>
                                <div className="profile-data-value">
                                    {data.department}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;

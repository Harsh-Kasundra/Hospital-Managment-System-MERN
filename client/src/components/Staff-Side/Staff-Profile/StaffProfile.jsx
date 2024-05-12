import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./StaffProfile.css";

const StaffProfile = () => {
    const [data, setData] = useState([]);
    const [password, setPassword] = useState({});
    const navigate = useNavigate();
    const apiUrl = "http://localhost:8080/hms/staff";

    //Caling API to get all the data from the database
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

    const handlePasswordChange = () => {
        fetch(
            "http://localhost:8080/hms/staff/pass/" +
                localStorage.getItem("id"),
            {
                method: "PUT",
                body: JSON.stringify(password),
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "jsonwebtoken"
                    )}`,
                    "Content-Type": "application/json",
                },
            }
        )
            .then((res) => {
                if (res.ok) {
                    Swal.fire(
                        "Success",
                        "Password changed successfully",
                        "success"
                    );
                } else {
                    Swal.fire("Error", "Failed to change password", "error");
                }
            })
            .catch((err) => {
                // Handle fetch error
                Swal.fire("Error", "Failed to change password", "error");
            });
    };

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
        <div className="mx-2 my-3 staff-profile-main">
            <div className="staff-profile-heading px-2">
                <div className="staff-profile-title">Your Profile</div>
                <div className="d-flex gap-4">
                    <div className="staff-profile-addbtn">
                        <button
                            className="staff-profile-btn"
                            onClick={() => {
                                Swal.fire({
                                    title: "Multiple inputs",
                                    html: `
                                    <label for="swal-input1">Current Password</label>
                                    <input id="swal-input1" name="prevPassword" class="swal2-input">
                                    <label for="swal-input2">New Password</label>
                                    <input id="swal-input2" name="password" class="swal2-input">
                                    `,
                                    focusConfirm: false,
                                    preConfirm: () => {
                                        return [
                                            document.getElementById(
                                                "swal-input1"
                                            ).value,
                                            document.getElementById(
                                                "swal-input2"
                                            ).value,
                                        ];
                                    },
                                }).then((formValues) => {
                                    console.log(formValues);
                                    const values = {};
                                    values["prevPassword"] =
                                        formValues.value[0];
                                    values["password"] = formValues.value[1];
                                    setPassword(values);
                                    console.log(password);
                                    handlePasswordChange(); // Call the method after setting the password state
                                });
                            }}
                        >
                            <span className="fw-semibold">Change Password</span>
                        </button>
                    </div>
                    <div className="staff-profile-addbtn">
                        <button
                            className="staff-profile-btn"
                            onClick={() => {
                                navigate(
                                    "/staff/profile/" +
                                        localStorage.getItem("id")
                                );
                            }}
                        >
                            <span className="fw-semibold">Edit Profile</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="staff-profile-details d-flex">
                <div className="staff-profile-left">
                    <div className="profile-img">
                        <img src={data.image} alt="profilpic" />
                    </div>
                    <div className="pb-5">
                        <div className="profile-data-heading">Role</div>
                        <div className="profile-data-value">{data.role}</div>
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
                    <div className="staff-profile-rightfirst">
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
                    <div className="staff-profile-rightsecond">
                        <div className="profile-Heading">
                            {" "}
                            Other Information
                        </div>
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
                            <div>
                                <div className="profile-data-heading">
                                    EXPERIENCE
                                </div>
                                <div className="profile-data-value">
                                    {data.experience}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="staff-profile-rightthisrd">
                        <div className="profile-Heading">Job Information</div>
                        <div className="d-flex justify-content-around">
                            <div>
                                <div className="profile-data-heading">
                                    SHIFT
                                </div>
                                <div className="profile-data-value">
                                    {data.shift}
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

export default StaffProfile;

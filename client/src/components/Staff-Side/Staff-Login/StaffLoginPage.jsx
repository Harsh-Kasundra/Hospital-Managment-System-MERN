import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StaffLoginPage.css";
import Swal from "sweetalert2";
const StaffLoginPage = () => {
    const [credentials, setCredentials] = useState({});
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        fetch("http://localhost:8080/hms/staffLogin/login", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(credentials),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Failed to log in");
                }
            })
            .then((result) => {
                console.log(result);
                if (result.succes === true) {
                    const token = result.token;
                    localStorage.setItem("jsonwebtoken", token);
                    navigate("/staff");
                } else {
                    throw new Error("Login failed");
                }
            })
            .catch((error) => {
                // Show error message using SweetAlert
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to log in. Please try again later.",
                });
                console.error("Error logging in:", error);
            });
    };

    return (
        <>
            <div className="stafflogin-main">
                <div className="stafflogin-img">
                    <div className="row">
                        <div className="stafflogin-wrapper1 col"></div>
                        <div className="stafflogin-wrapper2 col-4">
                            <div className="stafflogin-container">
                                <div className="stafflogin-welcome">
                                    Hey Staff !
                                </div>
                                <div className="stafflogin-heading">
                                    Let's Get You Sign In !
                                </div>
                                <form className="stafflogin-form" action="">
                                    <input
                                        placeholder="Username"
                                        name="username"
                                        type="text"
                                        className="stafflogin-input"
                                        required=""
                                        onChange={(e) => {
                                            setCredentials({
                                                ...credentials,
                                                username: e.target.value,
                                            });
                                        }}
                                    />
                                    <input
                                        placeholder="Password"
                                        name="password"
                                        type="password"
                                        className="stafflogin-input"
                                        required=""
                                        onChange={(e) => {
                                            setCredentials({
                                                ...credentials,
                                                password: e.target.value,
                                            });
                                        }}
                                    />
                                    <input
                                        value="Sign In"
                                        type="submit"
                                        className="stafflogin-login-button"
                                        onClick={handleLogin}
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StaffLoginPage;

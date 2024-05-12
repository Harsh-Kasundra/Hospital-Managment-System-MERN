import React, { useState } from "react";
import "./AdminLoginPage.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const AdminLoginPage = () => {
    const [credentials, setCredentials] = useState({});
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        fetch("http://localhost:8080/hms/admin/login", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(credentials),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return navigate("/adminLogin");
                }
            })
            .then((result) => {
                console.log(result);
                if (result.succes === true) {
                    const token = result.token;
                    localStorage.setItem("jsonwebtoken", token);
                    navigate("/admin");
                }
            })
            .catch((error) => {
                console.error(error);
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: "Invalid credentials. Please try again.",
                });
            });
    };
    return (
        <>
            <div className="adminlogin-main">
                <div className="adminlogin-img">
                    <div className="row">
                        <div className="adminlogin-wrapper1 col"></div>
                        <div className="adminlogin-wrapper2 col-4">
                            <div className="adminlogin-container">
                                <div className="adminlogin-welcome">
                                    Hey Admin !
                                </div>
                                <div className="adminlogin-heading">
                                    Let's Get You Sign In !
                                </div>
                                <form className="adminlogin-form" action="">
                                    <input
                                        placeholder="Username"
                                        name="username"
                                        type="text"
                                        className="adminlogin-input"
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
                                        className="adminlogin-input"
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
                                        className="adminlogin-login-button"
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

export default AdminLoginPage;

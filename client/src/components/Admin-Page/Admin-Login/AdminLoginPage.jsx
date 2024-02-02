import React from "react";
import "./AdminLoginPage.css";
const AdminLoginPage = () => {
    return (
        <>
            <div className="adminlogin-main">
                <div className="adminlogin-img">
                    <div className="row">
                        <div className="adminlogin-wrapper1 col"></div>
                        <div className="adminlogin-wrapper2 col-4">
                            <div className="adminlogin-container">
                                <div className="adminlogin-welcome">Welcome Admin !</div>
                                <div className="adminlogin-heading">Let's Get You Sign In !</div>
                                <form className="adminlogin-form" action="">
                                    <input placeholder="Username" name="username" type="text" className="adminlogin-input" required="" />
                                    <input placeholder="Password" name="password" type="password" className="adminlogin-input" required="" />
                                    <input value="Sign In" type="submit" className="adminlogin-login-button" />
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

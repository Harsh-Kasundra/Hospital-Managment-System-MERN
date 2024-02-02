import React from "react";
import "./StaffLoginPage.css";

const StaffLoginPage = () => {
    return (
        <>
            <div className="stafflogin-main">
                <div className="stafflogin-img">
                    <div className="row">
                        <div className="stafflogin-wrapper1 col"></div>
                        <div className="stafflogin-wrapper2 col-4">
                            <div className="stafflogin-container">
                                <div className="stafflogin-welcome">Welcome Staff !</div>
                                <div className="stafflogin-heading">Let's Get You Sign In !</div>
                                <form className="stafflogin-form" action="">
                                    <input placeholder="Username" name="username" type="text" className="stafflogin-input" required="" />
                                    <input placeholder="Password" name="password" type="password" className="stafflogin-input" required="" />
                                    <input value="Sign In" type="submit" className="stafflogin-login-button" />
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

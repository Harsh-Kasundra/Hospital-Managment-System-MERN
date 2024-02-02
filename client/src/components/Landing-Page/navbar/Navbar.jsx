import React from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faLocationDot, faClock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <>
            <div className="navbar-upper">
                <div className="row">
                    <div className="d-flex navbar-upper-content">
                        <div className="mx-2 col-1 d-flex justify-content-end align-items-center">
                            <FontAwesomeIcon icon={faPhone} style={{ color: "#43d5cb" }} />
                        </div>
                        <div className="navbar-text col-2 d-flex justify-content-start align-items-center">
                            <p className="text-light">Emergency Line : 0000000000</p>
                        </div>
                        <div className="mx-2 col-1 d-flex justify-content-end align-items-center">
                            <FontAwesomeIcon icon={faLocationDot} style={{ color: "#43d5cb" }} />
                        </div>
                        <div className=" col-2 d-flex justify-content-start align-items-center">
                            <p className="navbar-text text-light">Location : Brooklyn,New York</p>
                        </div>
                        <div className="mx-2 col d-flex justify-content-end align-items-center">
                            <FontAwesomeIcon icon={faClock} style={{ color: "#43d5cb" }} />
                        </div>
                        <div className="col d-flex justify-content-start">
                            <p className="navbar-text text-light ">Mon - Fri : 8:00 am - 7:00 pm </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="navbar-main">
                <div className="row ms-5 me-5">
                    <div className="col-2 d-flex justify-content-end navbar-logo align-items-center">
                        H<span>M</span>S
                    </div>
                    <div className="col d-flex gap-4 justify-content-end text-decoration-none">
                        <Link className="link" to="/">
                            <i>Home</i>
                        </Link>
                        <Link className="link" to="/adminLogin">
                            <i>Admin Login</i>
                        </Link>
                        <Link className="link" to="/staffLogin">
                            <i>Staff Login</i>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;

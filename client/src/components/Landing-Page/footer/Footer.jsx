import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import {
    faFacebookF,
    faInstagram,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="footer-main">
                <div className="container">
                    <div className="row footer-contact">
                        <div className="footer-contact1 col d-flex justify-content-start">
                            <div className="footer-icon">
                                <FontAwesomeIcon
                                    icon={faPhone}
                                    style={{ color: "#ffffff", fontSize: 16 }}
                                />
                            </div>
                            <p className="text-light ">
                                Please feel free to contact our friendly
                                reception staff with any medical enquiry, or
                                call 0000000000
                            </p>
                        </div>
                        <div className="footer-social col d-flex justify-content-end">
                            <div className="footer-social-contianer">
                                <div className="footer-social1">
                                    <FontAwesomeIcon
                                        icon={faFacebookF}
                                        style={{
                                            color: "#ffffff",
                                            fontSize: 16,
                                        }}
                                    />
                                </div>
                                <div className="footer-social1">
                                    <FontAwesomeIcon
                                        icon={faInstagram}
                                        style={{
                                            color: "#ffffff",
                                            fontSize: 16,
                                        }}
                                    />
                                </div>
                                <div className="footer-social1">
                                    <FontAwesomeIcon
                                        icon={faTwitter}
                                        style={{
                                            color: "#ffffff",
                                            fontSize: 16,
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="btn-main">
                                <button
                                    onClick={() => {
                                        navigate("/bookappointment");
                                    }}
                                    className="footer-btn"
                                >
                                    <span>Make Appointment</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;

import "./DataBar.css";
import React from "react";
import doctor from "../../../assets/doctor.png";
import soap from "../../../assets/liquid-soap.png";
import meds from "../../../assets/syringe.png";
import emergency from "../../../assets/emergency-services.png";
import consultation from "../../../assets/consultation.png";
import records from "../../../assets/medical-prescription.png";

const DataBar = () => {
    return (
        <div>
            <div className="container">
                <h1 className="databar-heading text-center text-primary ">Why Us?</h1>
                <div className=" data-container row">
                    <div className="data-column col-4">
                        <div className="databar-image ">
                            <img src={doctor} alt="" />
                        </div>
                        <div className="databar-title">Proffesional Doctors</div>
                        <div className="databar-detail">
                            We have the best medical experts to help with diagnosing your problems and help you with the proper and right treatment
                            for you and your family.{" "}
                        </div>
                    </div>
                    <div className="data-column col-4">
                        <div className="databar-image">
                            <img src={soap} alt="" />
                        </div>
                        <div className="databar-title">Hygenic Environment</div>
                        <div className="databar-detail">
                            Our environments are clean and free of germs. We make sure everwhere is condusive for all our patients. COVID 19 rules are
                            also obeyed at every time
                        </div>
                    </div>
                    <div className="data-column col-4">
                        <div className="databar-image">
                            <img src={meds} alt="" />
                        </div>
                        <div className="databar-title">Medicines at low prices</div>
                        <div className="databar-detail">Our pharmacy are very well stocked and our prices are relatively low.</div>
                    </div>
                    <div className="data-column col-4">
                        <div className="databar-image">
                            <img src={emergency} alt="" />
                        </div>
                        <div className="databar-title">Emergency Services</div>
                        <div className="databar-detail">
                            Our emergency service is one of the best in the country. Our drivers are readily available to move. Our buses are safe and
                            in perfect condition
                        </div>
                    </div>
                    <div className="data-column col-4">
                        <div className="databar-image">
                            <img src={consultation} alt="" />
                        </div>
                        <div className="databar-title">Online Consultation</div>
                        <div className="databar-detail">We have people that are readily available to answer your questions</div>
                    </div>
                    <div className="data-column col-4">
                        <div className="databar-image">
                            <img src={records} alt="" />
                        </div>
                        <div className="databar-title">Proper Records Keeping</div>
                        <div className="databar-detail">Our record keeping tactics is one of the best in the country</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataBar;

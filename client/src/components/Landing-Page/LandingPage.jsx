import MainContent from "./main-content/MainContent";
import DataBar from "./horizonatal-data-bar/DataBar";
import Footer from "./footer/Footer";
// import React from "react";

const LandingPage = () => {
    return (
        <div className="landing-main">
            <MainContent />
            <DataBar />
            <Footer />
        </div>
    );
};

export default LandingPage;

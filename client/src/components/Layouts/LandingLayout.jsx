import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Landing-Page/navbar/Navbar";

const LandingLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export default LandingLayout;

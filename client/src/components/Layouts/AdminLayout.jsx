import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminNavbar from "../Admin-Side/Admin-Navbar/AdminNavbar";

const AdminLayout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        fetch("http://localhost:8080/hms/admin/current", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jsonwebtoken")}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                localStorage.setItem("username", res.username);
                localStorage.setItem("id", res.id);
            })
            .catch((error) => {
                navigate("/adminLogin");
            });
    }, [navigate]);

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                        <AdminNavbar />
                    </div>
                    <div className="col mx-4">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminLayout;

import React, { useEffect, useState } from "react";
import "./Adminemployees.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AdminEmployees = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const navigate = useNavigate();
    const apiUrl = "http://localhost:8080/hms/staff";

    // Fetch data from the server and initialize state
    useEffect(() => {
        fetchData();
    }, []);

    // Function to fetch data from the server
    const fetchData = () => {
        fetch(apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jsonwebtoken")}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then((data) => {
                if (Array.isArray(data)) {
                    setData(data);
                    setFilteredData(data);
                } else {
                    console.error("Data fetched is not an array:", data);
                }
            })
            .catch((error) => console.error("Error fetching data:", error));
    };

    // Function to handle employee deletion
    const handleDelete = (id) => {
        // Display confirmation dialog using SweetAlert
        Swal.fire({
            icon: "warning",
            title: "Are you sure?",
            text: "You are about to delete this employee record. This action cannot be undone.",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                // Proceed with deletion
                fetch(apiUrl + "/" + id, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "jsonwebtoken"
                        )}`,
                        "Content-Type": "application/json",
                    },
                })
                    .then((res) => {
                        if (res.ok) {
                            // Show success message using SweetAlert
                            Swal.fire({
                                icon: "success",
                                title: "Deleted!",
                                text: "The employee record has been deleted.",
                            }).then(() => {
                                // Fetch updated data and update state
                                fetchData();
                            });
                        } else {
                            // Show error message using SweetAlert if deletion failed
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: "Failed to delete the employee record. Please try again later.",
                            });
                        }
                    })
                    .catch((error) => {
                        // Show error message using SweetAlert if an error occurs during deletion
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "An error occurred while deleting the employee record. Please try again later.",
                        });
                        console.error("Error deleting employee:", error);
                    });
            }
        });
    };

    // Function to handle input change and filter data
    const handleInputChange = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = data.filter((employee) => {
            const fullName =
                `${employee.firstName} ${employee.lastName}`.toLowerCase();
            return fullName.includes(searchTerm);
        });
        setFilteredData(filtered);
    };

    //Card For displaying Employees / staff
    const EmployeeCard = () => {
        if (!filteredData || filteredData.length === 0) {
            return <div>No employee data available</div>;
        }
        const card = data.map((employee, index) => {
            return (
                <>
                    <div className="col-3 my-3" key={employee.id}>
                        <div
                            className="admin-employee-card"
                            style={{ width: "20 rem" }}
                        >
                            <div className="dropdown d-flex justify-content-end ">
                                <button
                                    className="btn"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical" />
                                </button>
                                <ul className="dropdown-menu">
                                    <li className="d-flex align-items-center px-2">
                                        <FontAwesomeIcon icon="fa-solid fa-pen" />
                                        <Link
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigate(
                                                    "/admin/employees/" +
                                                        employee._id
                                                );
                                            }}
                                            className="dropdown-item"
                                        >
                                            Edit
                                        </Link>
                                    </li>
                                    <li className="d-flex align-items-center px-2">
                                        <FontAwesomeIcon icon="fa-solid fa-trash" />
                                        <Link
                                            onClick={() => {
                                                handleDelete(employee._id);
                                            }}
                                            className="dropdown-item"
                                        >
                                            Delete
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="admin-employee-upper">
                                <img
                                    src={employee.image}
                                    className="card-img-top admin-employee-cardimg"
                                    alt="..."
                                />
                                <div className="card-text fw-semibold text-center fs-5 my-2">
                                    {employee.firstName} {employee.lastName}
                                </div>
                                <div className="card-text text-center fs-6 text-secondary ">
                                    {employee.role}
                                </div>
                            </div>
                            <div className="admin-employee-lower px-3 py-3">
                                <div className="details d-flex justify-content-between">
                                    <div className="department d-flex flex-column justify-content-start">
                                        <div>Department</div>
                                        <div>{employee.department}</div>
                                    </div>
                                    <div className="joining-date d-flex flex-column justify-content-start">
                                        <div>Date Hired</div>
                                        <div>
                                            {employee.joiningDate
                                                ? new Date(
                                                      employee.joiningDate
                                                  ).toLocaleDateString()
                                                : "N/A"}
                                        </div>
                                    </div>
                                </div>
                                <div className="contacts">
                                    <div className="email d-flex gap-1 align-items-center">
                                        <i className="fa-solid fa-envelope"></i>
                                        <div>{employee.email}</div>
                                    </div>
                                    <div className="number d-flex gap-1 align-items-center">
                                        <FontAwesomeIcon icon="fa-solid fa-phone" />
                                        <div>{employee.contactNumber}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        });
        return <>{card}</>;
    };

    return (
        <div className="mx-2 my-3 admin-employee-main">
            <div className="admin-employee-heading px-2">
                <div className="admin-employee-title">All Employees</div>
                <div className="admin-employee-addbtn">
                    <button
                        className="admin-employee-btn"
                        onClick={() => {
                            navigate("/admin/add_employee");
                        }}
                    >
                        <span>Add Employee</span>
                    </button>
                </div>
            </div>
            <div className="admin-employee-search">
                <div className="InputContainer">
                    <input
                        type="text"
                        className="input"
                        id="input"
                        placeholder="Search here"
                        onChange={handleInputChange}
                    />
                    <label htmlFor="input" className="labelforsearch">
                        <svg viewBox="0 0 512 512" className="searchIcon">
                            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
                        </svg>
                    </label>
                </div>
            </div>
            <div className="row my-2 px-3">
                <EmployeeCard />
            </div>
        </div>
    );
};

export default AdminEmployees;

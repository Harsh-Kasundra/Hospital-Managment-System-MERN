// import LandingPage from "./components/landing page/LandingPage";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFontAwesome } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import "./App.css";
import LandingPage from "./components/Landing-Page/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StaffLoginPage from "./components/Staff-Side/Staff-Login/StaffLoginPage";
import AdminLoginPage from "./components/Admin-Side/Admin-Login/AdminLoginPage";
import LandingLayout from "./components/Layouts/LandingLayout";
import AdminLayout from "./components/Layouts/AdminLayout";
import StaffLayout from "./components/Layouts/StaffLayout";
import AdminDashboard from "./components/Admin-Side/Admin-Dashboard/AdminDashboard";
import AdminRegisteredPatients from "./components/Admin-Side/Admin-Registered-Patients/AdminRegisteredPatients";
import AdminAddPatient from "./components/Admin-Side/Admin-Add-Patient/AdminAddPatient";
import AdminEmployees from "./components/Admin-Side/Admin-Employees/AdminEmployees";
import AdminAddEmployee from "./components/Admin-Side/Admin-Add-Employee/AdminAddEmployee";
import AdminProfile from "./components/Admin-Side/Admin-Profile/AdminProfile";
import EditEmployees from "./components/Admin-Side/Admin-Employees/EditEmployees";
import EditPatient from "./components/Admin-Side/Admin-Registered-Patients/EditPatient";
import EditPatientStaff from "./components/Staff-Side/Staff-Registered-Patient/EditPatient";
import ViewPatient from "./components/Admin-Side/Admin-Registered-Patients/ViewPatient";
import ViewPatientStaff from "./components/Staff-Side/Staff-Registered-Patient/ViewPatient";
import StaffDashboard from "./components/Staff-Side/Staff-Dashboard/StaffDashboard";
import StaffRegisteredPatients from "./components/Staff-Side/Staff-Registered-Patient/StaffRegisteredPatient";
import StaffAddPatient from "./components/Staff-Side/Staff-Add-Patient/StaffAddPatient";
import StaffProfile from "./components/Staff-Side/Staff-Profile/StaffProfile";
import EditProfile from "./components/Admin-Side/Admin-Profile/EditProfile";
import EditProfile1 from "./components/Staff-Side/Staff-Profile/EditProfile";
import BookAppointment from "./components/Landing-Page/Book-Appointment/BookAppointment";

library.add(fas, far, faTwitter, faFontAwesome, faEnvelope);

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingLayout />}>
                        <Route path="/" element={<LandingPage />} />
                        <Route
                            path="/staffLogin"
                            element={<StaffLoginPage />}
                        />
                        <Route
                            path="/bookappointment"
                            element={<BookAppointment />}
                        />
                        <Route
                            path="/adminLogin"
                            element={<AdminLoginPage />}
                        />
                    </Route>
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route path="/admin" element={<AdminDashboard />} />
                        <Route
                            path="/admin/registered_patients"
                            element={<AdminRegisteredPatients />}
                        />
                        <Route
                            path="/admin/registered_patients/:id"
                            element={<EditPatient />}
                        />
                        <Route
                            path="/admin/registered_patients/view/:id"
                            element={<ViewPatient />}
                        />
                        <Route
                            path="/admin/add_patient"
                            element={<AdminAddPatient />}
                        />
                        <Route
                            path="/admin/employees"
                            element={<AdminEmployees />}
                        />
                        <Route
                            path="/admin/employees/:id"
                            element={<EditEmployees />}
                        />
                        <Route
                            path="/admin/add_employee"
                            element={<AdminAddEmployee />}
                        />
                        <Route
                            path="/admin/profile"
                            element={<AdminProfile />}
                        />
                        <Route
                            path="/admin/profile/:id"
                            element={<EditProfile />}
                        />
                    </Route>
                    <Route path="/staff" element={<StaffLayout />}>
                        <Route path="/staff" element={<StaffDashboard />} />
                        <Route
                            path="/staff/registered_patients"
                            element={<StaffRegisteredPatients />}
                        />
                        <Route
                            path="/staff/registered_patients/:id"
                            element={<EditPatientStaff />}
                        />
                        <Route
                            path="/staff/registered_patients/view/:id"
                            element={<ViewPatientStaff />}
                        />
                        <Route
                            path="/staff/add_patient"
                            element={<StaffAddPatient />}
                        />
                        <Route
                            path="/staff/profile/"
                            element={<StaffProfile />}
                        />
                        <Route
                            path="/staff/profile/:id"
                            element={<EditProfile1 />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;

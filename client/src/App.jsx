// import LandingPage from "./components/landing page/LandingPage";
import "./App.css";
import LandingPage from "./components/Landing-Page/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StaffLoginPage from "./components/Staff-Side/Staff-Login/StaffLoginPage";
import AdminLoginPage from "./components/Admin-Page/Admin-Login/AdminLoginPage";
import LandingLayout from "./components/Layouts/LandingLayout";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingLayout />}>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/staffLogin" element={<StaffLoginPage />} />
                        <Route path="/adminLogin" element={<AdminLoginPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;

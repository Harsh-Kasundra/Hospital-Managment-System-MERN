import { useNavigate } from "react-router-dom";
import "./MainContent.css";

const MainContent = () => {
    const navigate = useNavigate();
    return (
        <div className="main-gradiant">
            <div className="main-bg">
                <p className="main-p1">
                    We Work To take Care Of Your Health And Body
                </p>
                <h1 className="main-h1">
                    Serving Your Health Needs Is Our Priority
                </h1>
                <p className="main-p2">
                    The health and well-being of our patients and their health
                    care team will always be our priority, so we follow the best
                    practice for cleanliness.
                </p>
                <button
                    onClick={() => {
                        navigate("/bookappointment");
                    }}
                    className="main-btn1"
                >
                    Book Appointment
                </button>
            </div>
        </div>
    );
};

export default MainContent;

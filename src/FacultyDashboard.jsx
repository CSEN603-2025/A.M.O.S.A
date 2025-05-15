import React from "react";
import './CSS/FacultyDashboard.css';
import FacultyLayout from "./components/FacultyLayout";

const FacultyDashboard = () => {
    return (
      <FacultyLayout>
                <main className="dashboard-main">
                    
                        <div className="welcome-box">
                            <h2 className="welcome-title">Welcome to the Fcaulty Dashboard</h2>
                            <p className="welcome-text">Use the navigation panel on the right to view Reports and Statisitcs </p>

                        </div>
                 
                </main>

            </FacultyLayout>
    );
};

export default FacultyDashboard;


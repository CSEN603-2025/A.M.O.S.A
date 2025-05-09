import React, { useState } from "react";
import { Pencil } from "lucide-react"; // edit icon
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './CSS/SCADOfficeDashboard.css';

const SCADCurrentCycle = () => {
    const [editing, setEditing] = useState(false);
    const [startDate, setStartDate] = useState(new Date("2025-05-01"));
    const [endDate, setEndDate] = useState(new Date("2025-08-31"));
    const [tempStartDate, setTempStartDate] = useState(startDate);
    const [tempEndDate, setTempEndDate] = useState(endDate);

    const handleEditClick = () => {
        setEditing(true);
        setTempStartDate(startDate);
        setTempEndDate(endDate);
    };

    const handleSaveClick = () => {
        setStartDate(tempStartDate);
        setEndDate(tempEndDate);
        setEditing(false);
    };

    const handleCancelClick = () => {
        setEditing(false);
    };

    return (
        <div className="dashboard-wrapper">
            <header className="dashboard-header">
                <div className="header-left">
                    <h1 className="dashboard-title">SCAD Office Dashboard</h1>
                </div>
                <div className="header-right">
                    <a href="/" className="signout-button">Sign Out</a>
                </div>
            </header>
            <div className="dashboard-content">
                <aside className="dashboard-sidebar">
                    <h2 className="sidebar-title">Navigation</h2>
                    <ul className="nav-list">
                       
                            <li className="nav-item"><a href="/SCADOfficedashboard" className="nav-link">Home</a></li>
                        <li className="nav-item"><a href="/scad/companies" className="nav-link">Pending Company Applications</a></li>
                        <li className="nav-item"><a href="/scad/interns" className="nav-link">All Internships</a></li>
                            <li className="nav-item">Current Cycle Information</li>
                            <li className="nav-item"><a href="/scad/students" className="nav-link">View Students</a></li>
                            <li className="nav-item"><a href="/scad/reports" className="nav-link">View Reports</a></li>
                            <li className="nav-item"><a href="/scad/Statistics" className="nav-link">Statistics</a></li>
                        <li className="nav-item"><a href="/scad/Appointmnets" className="nav-link">Appointments</a></li>
                            <li className="nav-item"><a href="/scad/Calls" className="nav-link">Calls</a></li>
                            <li className="nav-item"><a href="/scad/Workshop" className="nav-link">Workshop</a></li>
                     
                    </ul>
                </aside>
                <main className="dashboard-main">
                    <div className="cycle-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h2 className="section-title">Current Cycle Information</h2>
                        {!editing && (
                            <button className="edit-button" onClick={handleEditClick}>
                                <Pencil size={20} />
                                Edit
                            </button>
                        )}
                    </div>
                    <section className="cycle-section">
                        {editing ? (
                            <>
                                <div className="date-picker-section">
                                    <label>Start Date:</label>
                                    <DatePicker selected={tempStartDate} onChange={(date) => setTempStartDate(date)} />
                                </div>
                                <div className="date-picker-section">
                                    <label>End Date:</label>
                                    <DatePicker selected={tempEndDate} onChange={(date) => setTempEndDate(date)} />
                                </div>
                                <div className="edit-buttons">
                                    <button onClick={handleSaveClick} className="save-button">Save Changes</button>
                                    <button onClick={handleCancelClick} className="cancel-button">Cancel</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <p>Start Date: {startDate.toLocaleDateString()}</p>
                                <p>End Date: {endDate.toLocaleDateString()}</p>
                                
                            </>
                        )}
                    </section>
                </main>
            </div>
            <footer className="dashboard-footer">
                <p>&copy; 2025 SCAD System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default SCADCurrentCycle;

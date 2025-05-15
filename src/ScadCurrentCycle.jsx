import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaPhone, FaBell } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import { Pencil } from "lucide-react"; // edit icon
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './CSS/SCADOfficeDashboard.css';
import './CSS/browseInternships.css';
import DashboardLayout from './components/Layout';

const SCADCurrentCycle = () => {
    const [editing, setEditing] = useState(false);
    const [startDate, setStartDate] = useState(new Date("2025-05-01"));
    const [endDate, setEndDate] = useState(new Date("2025-08-31"));
    const [tempStartDate, setTempStartDate] = useState(startDate);
    const [tempEndDate, setTempEndDate] = useState(endDate);
    const navigate = useNavigate();
    const location = useLocation();

    // Example numbers for calls and notifications
    const missedCalls = 5;
    const notifications = 3;

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

    const goToCalls = () => {
        navigate("/scad/Calls", { state: { from: location.pathname } });
    };

    const goToNotifications = () => {
        navigate("/scad/noti", { state: { from: location.pathname } });
    };

    // Format dates for display
    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
      <DashboardLayout>
                <main className="dashboard-main">
                    <div className="browser-wrapper">
                        <header className="browser-header">
                            <h1 className="browser-title">Current Cycle Information</h1>
                        </header>
                        <main className="browser-main">
                            <section className="list-section cycle-content">
                                <div className="cycle-container">
                                    {editing ? (
                                        <div className="edit-form-container">
                                            <h2 className="section-title">Edit Cycle Dates</h2>
                                            <div className="date-picker-group">
                                                <div className="date-picker-section">
                                                    <label>Start Date:</label>
                                                    <DatePicker
                                                        selected={tempStartDate}
                                                        onChange={(date) => setTempStartDate(date)}
                                                        className="date-picker"
                                                    />
                                                </div>
                                                <div className="date-picker-section">
                                                    <label>End Date:</label>
                                                    <DatePicker
                                                        selected={tempEndDate}
                                                        onChange={(date) => setTempEndDate(date)}
                                                        className="date-picker"
                                                    />
                                                </div>
                                            </div>
                                            <div className="edit-buttons">
                                                <button onClick={handleSaveClick} className="accept-button">Save Changes</button>
                                                <button onClick={handleCancelClick} className="reject-button">Cancel</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="cycle-info">
                                            <div className="internship-item cycle-item">
                                                <h2 className="section-title">Current Internship Cycle</h2>
                                                <p><strong>Start Date:</strong> {formatDate(startDate)}</p>
                                                <p><strong>End Date:</strong> {formatDate(endDate)}</p>
                                                <p><strong>Status:</strong> Active</p>
                                                <button className="edit-button" onClick={handleEditClick}>
                                                    <Pencil size={16} />
                                                    <span>Edit Dates</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </section>
                            <section className="list-section">
                                <h2 className="section-title">Important Deadlines</h2>
                                <ul className="internship-list">
                                    <li className="internship-item">
                                        <p><strong>Company Registration Deadline</strong></p>
                                        <p>June 1, 2025</p>
                                    </li>
                                    <li className="internship-item">
                                        <p><strong>Student Application Deadline</strong></p>
                                        <p>June 15, 2025</p>
                                    </li>
                                    <li className="internship-item">
                                        <p><strong>Interview Period</strong></p>
                                        <p>June 20 - July 10, 2025</p>
                                    </li>
                                    <li className="internship-item">
                                        <p><strong>Final Placement Notification</strong></p>
                                        <p>July 15, 2025</p>
                                    </li>
                                </ul>
                            </section>
                        </main>
                    </div>
                </main>
            
</DashboardLayout>
    );
};

export default SCADCurrentCycle;
import React, { useState } from "react";
import './CSS/SCADOfficeDashboard.css';

const SCADStatistics = () => {
    // Dummy real-time statistics for different cycles
    const cycleData = {
        "Winter 2024": {
            acceptedReports: 100,
            rejectedReports: 20,
            flaggedReports: 8,
            averageReviewTime: "2 days",
            topCourses: ["Operating Systems", "Computer Networks"],
            topRatedCompanies: ["Google", "Amazon"],
            topCompaniesByCount: ["IBM", "Intel"]
        },
        "Spring 2025": {
            acceptedReports: 110,
            rejectedReports: 10,
            flaggedReports: 5,
            averageReviewTime: "3 days",
            topCourses: ["Database Systems", "Software Engineering"],
            topRatedCompanies: ["Microsoft", "Meta"],
            topCompaniesByCount: ["Apple", "Oracle"]
        },
        "Summer 2025": {
            acceptedReports: 90,
            rejectedReports: 25,
            flaggedReports: 10,
            averageReviewTime: "4 days",
            topCourses: ["Artificial Intelligence", "Machine Learning"],
            topRatedCompanies: ["Tesla", "SpaceX"],
            topCompaniesByCount: ["NVIDIA", "AMD"]
        },
        "Winter 2026": {
            acceptedReports: 130,
            rejectedReports: 5,
            flaggedReports: 2,
            averageReviewTime: "1.5 days",
            topCourses: ["Data Structures", "Algorithms"],
            topRatedCompanies: ["Netflix", "Airbnb"],
            topCompaniesByCount: ["Cisco", "Dell"]
        }
    };

    const [selectedCycle, setSelectedCycle] = useState("Winter 2024");
    const [showReport, setShowReport] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);

    const handleCycleChange = (e) => {
        setSelectedCycle(e.target.value);
        setShowReport(false); // Reset report view on cycle change
    };

    const handleGenerateReport = () => {
        setOpenPopup(true); // Open the popup when "Generate Report" is clicked
    };

    const statistics = cycleData[selectedCycle];

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
                        <li className="nav-item"><a href="/SCADOfficeDashboard" className="nav-link">Home</a></li>
                        <li className="nav-item"><a href="/scad/companies" className="nav-link">Pending Company Applications</a></li>
                        <li className="nav-item"><a href="/scad/interns" className="nav-link">All Internships</a></li>
                        <li className="nav-item"><a href="/scad/cycle" className="nav-link">Current Cycle Information</a></li>
                        <li className="nav-item"><a href="/scad/students" className="nav-link">View Students</a></li>
                        <li className="nav-item"><a href="/scad/reports" className="nav-link">View Reports</a></li>
                        <li className="nav-item">Statistics</li>
                        <li className="nav-item"><a href="/scad/Appointmnets" className="nav-link">Appointments</a></li>
                        <li className="nav-item"><a href="/scad/Calls" className="nav-link">Calls</a></li>
                        <li className="nav-item"><a href="/scad/Workshop" className="nav-link">Workshop</a></li>
                    </ul>
                </aside>
                <main className="dashboard-main">
                    <h2 className="main-title">Real-Time Statistics</h2>

                    {/* Dropdown to choose cycle */}
                    <div className="cycle-selector">
                        <label htmlFor="cycleSelect">Select Cycle: </label>
                        <select id="cycleSelect" value={selectedCycle} onChange={handleCycleChange}>
                            {Object.keys(cycleData).map((cycle) => (
                                <option key={cycle} value={cycle}>{cycle}</option>
                            ))}
                        </select>
                    </div>

                    {/* Display selected cycle statistics */}
                    <div className="statistics-section">
                        <p><strong>Accepted Reports:</strong> {statistics.acceptedReports}</p>
                        <p><strong>Rejected Reports:</strong> {statistics.rejectedReports}</p>
                        <p><strong>Flagged Reports:</strong> {statistics.flaggedReports}</p>
                        <p><strong>Average Review Time:</strong> {statistics.averageReviewTime}</p>
                        <p><strong>Top Courses:</strong> {statistics.topCourses.join(", ")}</p>
                        <p><strong>Top Rated Companies:</strong> {statistics.topRatedCompanies.join(", ")}</p>
                        <p><strong>Top Companies by Internship Count:</strong> {statistics.topCompaniesByCount.join(", ")}</p>
                    </div>

                    {/* Button to simulate report generation */}
                    <button className="generate-report-button" onClick={handleGenerateReport}>
                        Generate Report
                    </button>
                </main>
            </div>

            {/* Popup with statistics and dummy download button */}
            {openPopup && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Generated Report for {selectedCycle}</h3>
                        <p><strong>Accepted Reports:</strong> {statistics.acceptedReports}</p>
                        <p><strong>Rejected Reports:</strong> {statistics.rejectedReports}</p>
                        <p><strong>Flagged Reports:</strong> {statistics.flaggedReports}</p>
                        <p><strong>Average Review Time:</strong> {statistics.averageReviewTime}</p>
                        <p><strong>Top Courses:</strong> {statistics.topCourses.join(", ")}</p>
                        <p><strong>Top Rated Companies:</strong> {statistics.topRatedCompanies.join(", ")}</p>
                        <p><strong>Top Companies by Internship Count:</strong> {statistics.topCompaniesByCount.join(", ")}</p>

                        {/* Dummy Download Button */}
                        <button className="download-button">Download Report</button>

                        {/* Close button for popup */}
                        <button className="close-button" onClick={() => setOpenPopup(false)}>Close</button>
                    </div>
                </div>
            )}

            <footer className="dashboard-footer">
                <p>&copy; 2025 SCAD System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default SCADStatistics;

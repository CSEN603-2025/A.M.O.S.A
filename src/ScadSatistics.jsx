import React, { useState } from "react";
import { FaPhone, FaBell } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer
} from 'recharts';
import './CSS/SCADOfficeDashboard.css';

const SCADStatistics = () => {
    const [selectedCycle, setSelectedCycle] = useState("Winter 2024");
    const [openPopup, setOpenPopup] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Example numbers for calls and notifications
    const missedCalls = 5;
    const notifications = 3;

    const goToCalls = () => {
        navigate("/scad/Calls", { state: { from: location.pathname } });
    };

    const goToNotifications = () => {
        navigate("/scad/noti", { state: { from: location.pathname } });
    };

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

    const handleCycleChange = (e) => {
        setSelectedCycle(e.target.value);
    };

    const handleGenerateReport = () => {
        setOpenPopup(true);
    };

    const handleDownload = (stats, cycleName) => {
        const content = `
SCAD Report - ${cycleName}

Accepted Reports: ${stats.acceptedReports}
Rejected Reports: ${stats.rejectedReports}
Flagged Reports: ${stats.flaggedReports}
Average Review Time: ${stats.averageReviewTime}

Top Courses:
${stats.topCourses.map((course, i) => `  ${i + 1}. ${course}`).join("\n")}

Top Rated Companies:
${stats.topRatedCompanies.map((company, i) => `  ${i + 1}. ${company}`).join("\n")}

Top Companies by Internship Count:
${stats.topCompaniesByCount.map((company, i) => `  ${i + 1}. ${company}`).join("\n")}
`;

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `SCAD_Report_${cycleName.replace(/\s/g, "_")}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    // Prepare data for reports and charts
    const allCyclesReportsData = Object.keys(cycleData).map(cycle => ({
        name: cycle,
        Accepted: cycleData[cycle].acceptedReports,
        Rejected: cycleData[cycle].rejectedReports,
        Flagged: cycleData[cycle].flaggedReports
    }));

    const statistics = cycleData[selectedCycle];

    // Pie chart data for selected cycle
    const pieChartData = [
        { name: 'Accepted', value: statistics.acceptedReports },
        { name: 'Rejected', value: statistics.rejectedReports },
        { name: 'Flagged', value: statistics.flaggedReports }
    ];

    const COLORS = ['#00C49F', '#FF6384', '#FFBB28'];

    return (
        <div className="dashboard-wrapper">
            <header className="dashboard-header">
                <div className="header-left">
                    <h1 className="dashboard-title">SCAD Office Dashboard</h1>
                </div>
                <div className="header-right">
                    <div className="header-icons">
                        {/* Calls Button with Badge */}
                        <button onClick={goToCalls} className="icon-button call-button">
                            <FaPhone />
                            <span className="call-badge">{missedCalls}</span>
                        </button>

                        {/* Notifications Button with Badge */}
                        <button onClick={goToNotifications} className="icon-button notification-button">
                            <FaBell />
                            <span className="notification-badge">{notifications}</span>
                        </button>

                        <a href="/" className="signout-button">Sign Out</a>
                    </div>
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

                    <div className="cycle-selector">
                        <label htmlFor="cycleSelect">Select Cycle: </label>
                        <select id="cycleSelect" value={selectedCycle} onChange={handleCycleChange}>
                            {Object.keys(cycleData).map((cycle) => (
                                <option key={cycle} value={cycle}>{cycle}</option>
                            ))}
                        </select>
                    </div>

                    {/* Bar Chart for All Cycles */}
                    <div className="chart-container">
                        <h3>Reports Across Cycles</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={allCyclesReportsData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Accepted" fill="#00C49F" />
                                <Bar dataKey="Rejected" fill="#FF6384" />
                                <Bar dataKey="Flagged" fill="#FFBB28" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Pie Chart for Selected Cycle */}
                    <div className="chart-container">
                        <h3>Report Distribution for {selectedCycle}</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={pieChartData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {pieChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="statistics-section">
                        <p><strong>Accepted Reports:</strong> {statistics.acceptedReports}</p>
                        <p><strong>Rejected Reports:</strong> {statistics.rejectedReports}</p>
                        <p><strong>Flagged Reports:</strong> {statistics.flaggedReports}</p>
                        <p><strong>Average Review Time:</strong> {statistics.averageReviewTime}</p>
                        <p><strong>Top Courses:</strong> {statistics.topCourses.join(", ")}</p>
                        <p><strong>Top Rated Companies:</strong> {statistics.topRatedCompanies.join(", ")}</p>
                        <p><strong>Top Companies by Internship Count:</strong> {statistics.topCompaniesByCount.join(", ")}</p>
                    </div>

                    <button className="generate-report-button" onClick={handleGenerateReport}>
                        Generate Report
                    </button>
                </main>
            </div>

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

                        <button className="download-button" onClick={() => handleDownload(statistics, selectedCycle)}>
                            Download Report
                        </button>
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
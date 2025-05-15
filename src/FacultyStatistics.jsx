import React, { useState } from "react";
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
import FacultyLayout from './components/FacultyLayout';

const FacultyStatistics = () => {
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
    const [openPopup, setOpenPopup] = useState(false);

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
      <FacultyLayout>

                <main className="dashboard-main">
                    <div className="browser-wrapper">
                        <header className="browser-header">
                            <h1 className="browser-title">Internship Cycle Statistics</h1>
                        </header>

                        <main className="browser-main">
                            <section className="filter-section">
                                <h2 className="section-title">Select Cycle</h2>
                                <select
                                    id="cycleSelect"
                                    value={selectedCycle}
                                    onChange={handleCycleChange}
                                    className="filter-select"
                                >
                                    {Object.keys(cycleData).map((cycle) => (
                                        <option key={cycle} value={cycle}>{cycle}</option>
                                    ))}
                                </select>
                            </section>

                            <section className="list-section">
                                <h2 className="section-title">Statistics for {selectedCycle}</h2>

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

                                <div className="chart-container">
                                    <h3>Report Distribution</h3>
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

                                <div className="statistics-details">
                                    <p><strong>Accepted Reports:</strong> {statistics.acceptedReports}</p>
                                    <p><strong>Rejected Reports:</strong> {statistics.rejectedReports}</p>
                                    <p><strong>Flagged Reports:</strong> {statistics.flaggedReports}</p>
                                    <p><strong>Average Review Time:</strong> {statistics.averageReviewTime}</p>
                                    <p><strong>Top Courses:</strong> {statistics.topCourses.join(", ")}</p>
                                    <p><strong>Top Rated Companies:</strong> {statistics.topRatedCompanies.join(", ")}</p>
                                    <p><strong>Top Companies by Internship Count:</strong> {statistics.topCompaniesByCount.join(", ")}</p>
                                </div>

                                <button
                                    className="generate-report-button"
                                    onClick={handleGenerateReport}
                                    style={{ marginTop: '20px' }}
                                >
                                    Generate Report
                                </button>
                            </section>
                        </main>
                    </div>
                </main>
            

            {openPopup && (
                <div className="workshop-modal-backdrop">
                    <div className="workshop-modal">
                        <div className="modal-buttons">
                            <button onClick={() => setOpenPopup(false)}>Close</button>
                        </div>
                        <h2>Generated Report for {selectedCycle}</h2>
                        <div className="report-content">
                            <p><strong>Accepted Reports:</strong> {statistics.acceptedReports}</p>
                            <p><strong>Rejected Reports:</strong> {statistics.rejectedReports}</p>
                            <p><strong>Flagged Reports:</strong> {statistics.flaggedReports}</p>
                            <p><strong>Average Review Time:</strong> {statistics.averageReviewTime}</p>
                            <p><strong>Top Courses:</strong> {statistics.topCourses.join(", ")}</p>
                            <p><strong>Top Rated Companies:</strong> {statistics.topRatedCompanies.join(", ")}</p>
                            <p><strong>Top Companies by Internship Count:</strong> {statistics.topCompaniesByCount.join(", ")}</p>
                        </div>
                        <button
                            className="download-button"
                            onClick={() => handleDownload(statistics, selectedCycle)}
                        >
                            Download Report
                        </button>
                    </div>
                </div>
            )}

          
        </FacultyLayout>
    );
};

export default FacultyStatistics;
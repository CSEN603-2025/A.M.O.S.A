import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiBell, FiBriefcase, FiDownload } from "react-icons/fi";
import { Pencil } from "lucide-react";
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
import './CSS/browseInternships.css';
import DashboardLayout from './components/Layout';

const SCADStatistics = () => {
    const [selectedCycle, setSelectedCycle] = useState("Winter 2024");
    const [openPopup, setOpenPopup] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

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
        <DashboardLayout>
            <main className="main-content" aria-label="Main Content">
                <h1 className="main-welcome" style={{ marginTop: 0, marginBottom: 32 }}>Internship Cycle Statistics</h1>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 24 }}>
                    <h2 className="section-title" style={{ margin: 0 }}>Cycle Statistics</h2>
                    <div style={{ display: 'flex', gap: 16 }}>
                        <select
                            id="cycleSelect"
                            value={selectedCycle}
                            onChange={handleCycleChange}
                            className="filter-select"
                            style={{
                                padding: '8px 12px',
                                borderRadius: 8,
                                border: '1px solid var(--border)',
                                backgroundColor: 'white',
                                fontSize: 14,
                                cursor: 'pointer'
                            }}
                        >
                            {Object.keys(cycleData).map((cycle) => (
                                <option key={cycle} value={cycle}>{cycle}</option>
                            ))}
                        </select>
                        <button
                            onClick={handleGenerateReport}
                            style={{
                                background: 'var(--primary)',
                                color: 'white',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: 8,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                fontWeight: 600,
                                fontSize: 14
                            }}
                        >
                            <FiDownload size={16} /> Generate Report
                        </button>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, width: '100%', marginBottom: 24 }}>
                    <div className="internship-item" style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(30,41,59,0.06)', padding: 24, border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                            <FiBriefcase style={{ color: 'var(--primary)', fontSize: 22 }} />
                            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Reports Overview</span>
                        </div>
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

                    <div className="internship-item" style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(30,41,59,0.06)', padding: 24, border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                            <FiBriefcase style={{ color: 'var(--primary)', fontSize: 22 }} />
                            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Report Distribution ({selectedCycle})</span>
                        </div>
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
                </div>

                <div className="internship-item" style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(30,41,59,0.06)', padding: 24, border: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                        <FiBriefcase style={{ color: 'var(--primary)', fontSize: 22 }} />
                        <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Detailed Statistics for {selectedCycle}</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                        <div style={{ display: 'grid', gap: 12 }}>
                            <div style={{ fontSize: 15 }}><strong>Accepted Reports:</strong> {statistics.acceptedReports}</div>
                            <div style={{ fontSize: 15 }}><strong>Rejected Reports:</strong> {statistics.rejectedReports}</div>
                            <div style={{ fontSize: 15 }}><strong>Flagged Reports:</strong> {statistics.flaggedReports}</div>
                            <div style={{ fontSize: 15 }}><strong>Average Review Time:</strong> {statistics.averageReviewTime}</div>
                        </div>
                        <div style={{ display: 'grid', gap: 12 }}>
                            <div style={{ fontSize: 15 }}><strong>Top Courses:</strong> {statistics.topCourses.join(", ")}</div>
                            <div style={{ fontSize: 15 }}><strong>Top Rated Companies:</strong> {statistics.topRatedCompanies.join(", ")}</div>
                            <div style={{ fontSize: 15 }}><strong>Top Companies by Count:</strong> {statistics.topCompaniesByCount.join(", ")}</div>
                        </div>
                    </div>
                </div>

                {openPopup && (
                    <div className="workshop-modal-backdrop">
                        <div className="workshop-modal">
                            <div className="modal-buttons">
                                <button onClick={() => setOpenPopup(false)} style={{
                                    background: '#FF6384',
                                    color: 'white',
                                    border: 'none',
                                    padding: '8px 16px',
                                    borderRadius: 8,
                                    cursor: 'pointer',
                                    fontWeight: 600
                                }}>
                                    Close
                                </button>
                            </div>
                            <h2 style={{ marginBottom: 16 }}>Generated Report for {selectedCycle}</h2>
                            <div className="report-content" style={{ marginBottom: 24 }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                    <div style={{ fontSize: 15 }}><strong>Accepted Reports:</strong> {statistics.acceptedReports}</div>
                                    <div style={{ fontSize: 15 }}><strong>Rejected Reports:</strong> {statistics.rejectedReports}</div>
                                    <div style={{ fontSize: 15 }}><strong>Flagged Reports:</strong> {statistics.flaggedReports}</div>
                                    <div style={{ fontSize: 15 }}><strong>Average Review Time:</strong> {statistics.averageReviewTime}</div>
                                    <div style={{ fontSize: 15 }}><strong>Top Courses:</strong> {statistics.topCourses.join(", ")}</div>
                                    <div style={{ fontSize: 15 }}><strong>Top Rated Companies:</strong> {statistics.topRatedCompanies.join(", ")}</div>
                                    <div style={{ fontSize: 15 }}><strong>Top Companies by Count:</strong> {statistics.topCompaniesByCount.join(", ")}</div>
                                </div>
                            </div>
                            <button
                                className="download-button"
                                onClick={() => handleDownload(statistics, selectedCycle)}
                                style={{
                                    background: '#00C49F',
                                    color: 'white',
                                    border: 'none',
                                    padding: '10px 24px',
                                    borderRadius: 8,
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    margin: '0 auto'
                                }}
                            >
                                <FiDownload size={16} /> Download Report
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </DashboardLayout>
    );
};

export default SCADStatistics;
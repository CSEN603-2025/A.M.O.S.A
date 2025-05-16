import React from "react";
import FacultyLayout from "./components/FacultyLayout";

const FacultyDashboard = () => {
  // Dummy data
  const internshipSummary = {
    currentCycle: "Summer 2025",
    totalReports: 134,
    reviewedReports: 98,
    pendingReviews: 36
  };

  const recentReports = [
    { student: "Ahmed Khaled", company: "Siemens", date: "May 10, 2025" },
    { student: "Lina Samir", company: "Valeo", date: "May 9, 2025" },
    { student: "Omar Youssef", company: "Orange Egypt", date: "May 8, 2025" }
  ];

  const keyStats = [
    { label: "Students Participating", value: 312 },
    { label: "Companies Involved", value: 47 },
    { label: "Avg. Report Score", value: "88%" }
  ];

  return (
    <FacultyLayout>
      <main style={{ padding: "20px" }}>
        {/* Welcome Box */}
        <div style={{
          backgroundColor: "#f9f9f9",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)"
        }}>
          <h2 style={{ marginTop: 0 }}>Welcome to the Faculty Dashboard</h2>
          <p style={{ color: "#555" }}>
            Use the navigation panel on the right to view reports and statistics.
          </p>
        </div>

        {/* Dummy Data Section */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px"
        }}>
          {/* Internship Program Overview */}
          <div style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
            flex: 1,
            minWidth: "250px"
          }}>
            <h3 style={{ marginTop: 0, color: "#2c3e50" }}>Internship Program Overview</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li><strong>Cycle:</strong> {internshipSummary.currentCycle}</li>
              <li><strong>Total Reports:</strong> {internshipSummary.totalReports}</li>
              <li><strong>Reviewed Reports:</strong> {internshipSummary.reviewedReports}</li>
              <li><strong>Pending Reviews:</strong> {internshipSummary.pendingReviews}</li>
            </ul>
          </div>

          {/* Recent Reports */}
          <div style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
            flex: 1,
            minWidth: "250px"
          }}>
            <h3 style={{ marginTop: 0, color: "#2c3e50" }}>Recent Report Submissions</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {recentReports.map((report, index) => (
                <li key={index} style={{ marginBottom: "10px" }}>
                  <strong>{report.student}</strong> @ {report.company} – <em>{report.date}</em>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Statistics */}
          <div style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
            flex: 1,
            minWidth: "250px"
          }}>
            <h3 style={{ marginTop: 0, color: "#2c3e50" }}>Key Internship Stats</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {keyStats.map((stat, idx) => (
                <li key={idx} style={{ marginBottom: "10px" }}>
                  <strong>{stat.label}:</strong> {stat.value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </FacultyLayout>
  );
};

export default FacultyDashboard;

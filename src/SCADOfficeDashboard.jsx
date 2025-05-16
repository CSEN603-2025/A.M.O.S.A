import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPhone } from "react-icons/fa";
import { FiBell, FiHome, FiBriefcase, FiList, FiInfo, FiUsers, FiFileText, FiBarChart2, FiCalendar, FiPhone as FiPhoneIcon, FiTool } from "react-icons/fi";
import './CSS/SCADOfficeDashboard.css';
import DashboardLayout from './components/Layout';

const SCADOfficeDashboard = () => {
  const navigate = useNavigate();
  const missedCalls = 5;
  const notifications = 3;

  // Internship program data
  const internshipProgram = {
    currentCycle: "Summer 2023",
    status: "Active",
    studentsRegistered: 187,
    companiesParticipating: 42,
    startDate: "June 1, 2023",
    endDate: "August 31, 2023"
  };

  // Important notices
  const notices = [
    "Company application deadline: May 25",
    "Mandatory orientation: May 30, 2pm",
    "Interview week: June 5-9",
    "Final matching results: June 15"
  ];

  // Quick stats
  const stats = [
    { label: "Pending Approvals", value: 12 },
    { label: "New Messages", value: 8 },
    { label: "Upcoming Meetings", value: 3 }
  ];

  return (
    <DashboardLayout>
      <main className="main-content" aria-label="Main Content">
        <h2 className="main-welcome">Welcome to the SCAD Office Dashboard</h2>
        <p className="main-desc">
          Use the navigation panel on the left to explore and manage internships, company applications, students, and more.
        </p>

        {/* Internship Program Card */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '20px',
          margin: '20px 0',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginTop: 0, color: '#2c3e50' }}>Current Internship Program</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <p style={{ margin: '5px 0', color: '#7f8c8d' }}>Cycle</p>
              <p style={{ margin: '5px 0', fontSize: '1.2em', fontWeight: 'bold' }}>{internshipProgram.currentCycle}</p>
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <p style={{ margin: '5px 0', color: '#7f8c8d' }}>Status</p>
              <p style={{ 
                margin: '5px 0', 
                fontSize: '1.2em', 
                fontWeight: 'bold',
                color: internshipProgram.status === 'Active' ? '#27ae60' : '#e74c3c'
              }}>
                {internshipProgram.status}
              </p>
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <p style={{ margin: '5px 0', color: '#7f8c8d' }}>Students</p>
              <p style={{ margin: '5px 0', fontSize: '1.2em', fontWeight: 'bold' }}>{internshipProgram.studentsRegistered}</p>
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <p style={{ margin: '5px 0', color: '#7f8c8d' }}>Companies</p>
              <p style={{ margin: '5px 0', fontSize: '1.2em', fontWeight: 'bold' }}>{internshipProgram.companiesParticipating}</p>
            </div>
          </div>
          <div style={{ marginTop: '15px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div>
              <p style={{ margin: '5px 0', color: '#7f8c8d' }}>Start Date</p>
              <p style={{ margin: '5px 0', fontWeight: 'bold' }}>{internshipProgram.startDate}</p>
            </div>
            <div>
              <p style={{ margin: '5px 0', color: '#7f8c8d' }}>End Date</p>
              <p style={{ margin: '5px 0', fontWeight: 'bold' }}>{internshipProgram.endDate}</p>
            </div>
          </div>
        </div>

        {/* Notices and Stats Section */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', margin: '20px 0' }}>
          {/* Important Notices */}
          <div style={{
            flex: 2,
            minWidth: '300px',
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ marginTop: 0, color: '#2c3e50' }}>Important Notices</h3>
            <ul style={{ paddingLeft: '20px', margin: '10px 0' }}>
              {notices.map((notice, index) => (
                <li key={index} style={{ marginBottom: '10px' }}>{notice}</li>
              ))}
            </ul>
          </div>

          {/* Quick Stats */}
          <div style={{
            flex: 1,
            minWidth: '250px',
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ marginTop: 0, color: '#2c3e50' }}>Quick Stats</h3>
            {stats.map((stat, index) => (
              <div key={index} style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 0',
                borderBottom: index < stats.length - 1 ? '1px solid #eee' : 'none'
              }}>
                <span>{stat.label}</span>
                <span style={{ 
                  fontWeight: 'bold',
                  color: stat.value > 5 ? '#e74c3c' : '#2c3e50'
                }}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default SCADOfficeDashboard;

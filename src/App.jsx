import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Login';
import CompanyRegistration from './CompanyRegistration';
import CompanyDashboard from './CompanyDashboard';
import StudentDashboard from './StudentDashboard';
import SCADOfficeDashboard from './SCADOfficeDashboard';
import FacultyDashboard from './FacultyDashboard';
import CompanyProfile from './Company/CompanyProfile';
import InternshipManagement from './Company/InternshipManagement';
import ApplicationsReview from './Company/ApplicationsReview';
import StudentProfile from './Student/StudentProfile';
import InternshipBrowser from './Student/browseInternships';


function App() {
  const [count, setCount] = useState(0)

  return (
      <Router>
          <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/Student/internships" element={<InternshipBrowser />} />
              <Route path="/Student/Profile" element={<StudentProfile />} />
              <Route path="/Facultydashboard" element={<FacultyDashboard />} />
              <Route path="/Company/Applications" element={<ApplicationsReview />} />
              <Route path="/Company/profile" element={<CompanyProfile />} />
              <Route path="/Company/internshippost" element={<InternshipManagement />} />
              <Route path="/SCADOfficedashboard" element={<SCADOfficeDashboard />} />
              <Route path="/Companydashboard" element={<CompanyDashboard />} />
              <Route path="/CompanyRegistration" element={<CompanyRegistration />} />
              <Route path="/Studentdashboard" element={<StudentDashboard />} />
             
          </Routes>
      </Router>
  )
}

export default App

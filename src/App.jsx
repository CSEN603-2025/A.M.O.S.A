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
import StudentInternships from './studentInternships';
import StudentApplied from './StudentApplied';

import SCADPendingCompany from './ScadPendingCompany';
import SCADCurrentCycle from './ScadCurrentCycle';
import SCADStudent from './ScadStudents';
import SCADStatistics from './ScadSatistics';
import AppointmentsScad from './AppointmentsScad';
import SCADCalls from './ScadCalls';
import SCADWorkship from './ScadWorkship';
import SCADReports from './ScadReports';
import SCADWorkshop from './ScadInternships';
import SCADInternships from './ScadInternships';
import FacultyStatistics from './FacultyStatistics';
import FacultyReports from './FacultyReports';
import PROStudentDashboard from './PROStudentDashboard';
import ProAppointments from './ProAppointments';
import PROCalls from './PROCalls';
import PROWorkshop from './PROWorkshop';
import PROStudentProfile from './Student/PROStudentProfile';
import PROViewed from './PROViewed';
import PROAssessment from './PROAssessment';







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
              <Route path="/studentInternships" element={<StudentInternships />} />
              <Route path="/StudentApplied" element={<StudentApplied />} />

              <Route path="/scad/companies" element={<SCADPendingCompany />} />
              <Route path="/scad/cycle" element={<SCADCurrentCycle />} />
              <Route path="/scad/students" element={<SCADStudent />} />
              <Route path="/scad/Statistics" element={<SCADStatistics />} />
              <Route path="/scad/Appointmnets" element={<AppointmentsScad />} />
              <Route path="/scad/Calls" element={<SCADCalls />} />
              <Route path="/scad/Workshop" element={<SCADWorkship />} />
              <Route path="/scad/reports" element={<SCADReports />} />
              <Route path="/scad/interns" element={<SCADInternships />} />

              <Route path="/faculty/statistics" element={<FacultyStatistics />} />
              <Route path="/faculty/reports" element={<FacultyReports />} />

              <Route path="/student/proprofile" element={<PROStudentProfile/>}/>
              <Route path="/student/viewed" element={<PROViewed/>}/>
              <Route path ="/student/assessment" element ={<PROAssessment/>}/>

              <Route path="/PROStudentDashboard" element={<PROStudentDashboard />} />
              <Route path="/student/appointments" element={<ProAppointments />} />
              <Route path ="/student/calls" element = {<PROCalls/>}/>
              <Route path ="/student/workshop" element ={<PROWorkshop/>}/>

          </Routes>
      </Router>
  )
}

export default App

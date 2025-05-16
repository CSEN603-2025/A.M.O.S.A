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
import StudentInternships from './StudentInternships';
import StudentApplied from './StudentApplied';
import StudentNotifications from './StudentNotifications';
import MyInternships from './MyInternships';
import ReportFeedback from './ReportFeedback';

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

import CompanyInternships from './CompanyInternships';
import CompanyAll from './CompanyAll';
import CompanyCurrentInterns from './CompanyCurrentInterns';
import CompanyDocs from './CompanyDocs';
import CompanyNotifications from './CompanyNotifications';


import SCADNotificationPage from './ScadNotifi';
import PROStudentinternship from './PROStudentinternship';
import PROStudentApplied from './PROStudentApplied';
import PROMyInternships from './PROMyInternships';
import PROStudentNotifications from './PROStudentNotifications';
import PROReportFeedback from './PROReportFeedback';
import PreRecord from './PreRecord';
import NewMyInternships from './MynewInternships';


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
              <Route path="/StudentNotifications" element={<StudentNotifications />} />
              <Route path="/MyInternships" element={<MyInternships />} />
              <Route path="/MyNewInternships" element={<NewMyInternships />} />
              <Route path="/ReportFeedback" element={<ReportFeedback/>} />

              <Route path="/scad/companies" element={<SCADPendingCompany />} />
              <Route path="/scad/cycle" element={<SCADCurrentCycle />} />
              <Route path="/scad/students" element={<SCADStudent />} />
              <Route path="/scad/Statistics" element={<SCADStatistics />} />
              <Route path="/scad/Appointmnets" element={<AppointmentsScad />} />
              <Route path="/scad/Calls" element={<SCADCalls />} />
              <Route path="/scad/Workshop" element={<SCADWorkship />} />
              <Route path="/scad/reports" element={<SCADReports />} />
              <Route path="/scad/interns" element={<SCADInternships />} />

              <Route path="/CompanyInternships" element={<CompanyInternships />} />
              <Route path="/CompanyAll" element={<CompanyAll />} />
              <Route path="/CompanyCurrentInterns" element={<CompanyCurrentInterns />} />
              <Route path="/CompanyDocs" element={<CompanyDocs />} />
              <Route path="/CompanyNotifications" element={<CompanyNotifications />} />

              <Route path="/faculty/statisticss" element={<FacultyStatistics />} />
              <Route path="/faculty/reports" element={<FacultyReports />} />

              <Route path="/student/proprofile" element={<PROStudentProfile/>}/>
              <Route path="/student/viewed" element={<PROViewed/>}/>
              <Route path ="/student/assessment" element ={<PROAssessment/>}/>

              <Route path="/PROStudentDashboard" element={<PROStudentDashboard />} />
              <Route path="/student/appointments" element={<ProAppointments />} />
              <Route path ="/student/calls" element = {<PROCalls/>}/>
              <Route path="/student/workshop" element={<PROWorkshop />} />

              <Route path="/scad/noti" element={<SCADNotificationPage />} />
              <Route path="/PROStudentinternship" element={<PROStudentinternship/>}/>
              <Route path="/PROStudentApplied" element={<PROStudentApplied/>}/>
              <Route path ="/PROMyInternships" element={<PROMyInternships/>}/>
              <Route path ="/PROStudentNotifications" element={<PROStudentNotifications/>}/>
              <Route path ="/PROReportFeedback" element={<PROReportFeedback/>}/>
              <Route path ="/PreRecord" element={<PreRecord/>}/>

          </Routes>
      </Router>
  )
}

export default App

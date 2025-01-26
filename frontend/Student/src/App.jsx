import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdvisorNavbar from './components/advisorNavbar';
import Navbar from './components/Navbar';
import AdvisorHome from './pages/advisor/advisorHome';
import AdvisorMeeting from './pages/advisor/advisorMeeting';
import AdvisorReport from './pages/advisor/advisorReport';
import AdvisorStudents from './pages/advisor/advisorStudents';
import Home from './pages/home';
import Issues from './pages/issues';
import Meeting from './pages/meeting';
import MilestoneProgress from './pages/milestones';
import StudentDetails from './pages/student/studentDetails';
import Report from './pages/report'; 

function App() {
  const [role, setRole] = useState('student'); // Set role to 'student'

  return (
    <Router>
      <div className='min-h-screen'>
        {/* Render Navbar based on role */}
        {role === 'student' && <Navbar />}
        {role === 'advisor' && <AdvisorNavbar />}

        <div className='p-20'>
          <Routes>
            {/* Routes for student */}
            {role === 'student' && (
              <>
                <Route path="/" element={<Report />} /> {/* Set initial route to Report */}
                <Route path="/issues" element={<Issues />} />
                <Route path="/meeting" element={<Meeting />} />
                <Route path="/milestones" element={<MilestoneProgress />} />
                <Route path="/student-details" element={<StudentDetails />} />
              </>
            )}
            {/* Routes for advisor */}
            {role === 'advisor' && (
              <>
                <Route path="/" element={<AdvisorHome />} />
                <Route path="/advisor-meeting" element={<AdvisorMeeting />} />
                <Route path="/advisor-report" element={<AdvisorReport />} />
                <Route path="/advisor-students" element={<AdvisorStudents />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
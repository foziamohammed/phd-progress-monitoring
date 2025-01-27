import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdvisorNavbar from './components/advisorNavbar';
import Navbar from './components/Navbar';
import AdvisorHome from './pages/advisor/advisorHome';
import AdvisorMeeting from './pages/advisor/advisorMeeting';
import AdvisorReport from './pages/advisor/advisorReport';
import AdvisorStudents from './pages/advisor/advisorStudents';
import Issues from './pages/issues';
import Meeting from './pages/meeting';
import MilestoneProgress from './pages/milestones';
import Report from './pages/report';
import StudentDetails from './pages/student/studentDetails';


function App() {
  const [role, setRole] = useState('student'); // Dynamically set this role (e.g., after login)

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
                <Route path="/" element={<Report />} />
                <Route path="/issues" element={<Issues />} />
                <Route path="/meeting" element={<Meeting />} />
                <Route path="/milestones" element={<MilestoneProgress />} />

              </>
            )}

            {/* Routes for advisor */}
            {role === 'advisor' && (
              <>
                <Route path="/" element={<AdvisorHome />} />
                <Route path="/advisor/meeting" element={<AdvisorMeeting />} />
                <Route path="/advisor/students" element={<AdvisorStudents />} />
                <Route path="/advisor/student-details/:studentId" element={<StudentDetails />} />
                <Route path="/advisor/document" element={<AdvisorReport />} />

              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

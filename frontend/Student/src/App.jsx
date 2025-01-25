import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Home from './pages/home';
import Issues from './pages/issues';
import Meeting from './pages/meeting';
import MilestoneProgress from './pages/milestones';
import AdvisorHome from './pages/advisor/advisorHome';
import AdvisorMeeting from './pages/advisor/advisorMeeting';
import AdvisorStudents from './pages/advisor/advisorStudents';
import AdvisorNavbar from './components/advisorNavbar';
import StudentDetails from './pages/student/studentDetails';
import AdvisorReport from './pages/advisor/advisorReport';

function App() {
  const [role, setRole] = useState('advisor'); // Dynamically set this role (e.g., after login)

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
                <Route path="/" element={<Home />} />
                <Route path="/issues" element={<Issues />} />
                <Route path="/meeting" element={<Meeting />} />
                <Route path="/milestones" element={<MilestoneProgress />} />
                <Route path="/report" element={<DocumentTable />} />
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
                <Route path="/milestone_form" element={<AddMilestone />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

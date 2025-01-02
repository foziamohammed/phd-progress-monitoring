import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './pages/home'
import Issues from './pages/issues';
import Meeting from './pages/meeting'
import MilestoneProgress from './pages/milestones';
function App() {


  return (
    <Router>
    <div className='min-h-screen'>
        <Navbar></Navbar>
        
        <div className='p-20'>
          <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/issues" element={<Issues />} />
            <Route path="/meeting" element={<Meeting />} />
            <Route path="/milestones" element={<MilestoneProgress />} />
          </Routes></div>
    </div>
    </Router>
    
    
   
   
  )
}

export default App

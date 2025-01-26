const meetingService = require('../services/meetingServices');
const MeetingRequest = require('../models/meetingRequest');
const sendEmail = require('../utils/email');  // import the email utility


exports.createMeetingRequest = async (req, res) => {
    const studentId = req.user.id;
    const studentName = req.user.name;
    
    // Get form data from request body
    const { advisorId, dateTime, agenda, place } = req.body;

    if (!studentName || !studentId || !advisorId || !dateTime) {
        return res.status(400).json({ message: 'All required fields are missing.' });
    }

    try {
        const newRequest = await meetingService.createMeeting({
            studentName,
            studentId,
            advisorId,
            dateTime,
            agenda,
            place
        });
        
        res.status(201).json({ message: 'Meeting request sent!', request: newRequest });
    } catch (error) {
        console.error('Error creating meeting request:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAdvisorRequests = async (req, res) => {
    const { advisorId } = req.params;

    try {
        const requests = await meetingService.getRequestsByAdvisor(advisorId);
        res.status(200).json({ requests });
    } catch (error) {
        console.error('Error fetching meeting requests:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.approveMeetingRequest = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedRequest = await meetingService.approveRequest(id);
        if (!updatedRequest) {
            return res.status(404).json({ message: 'Meeting request not found' });
        }
        res.status(200).json({ message: 'Meeting request approved', request: updatedRequest });
    } catch (error) {
        console.error('Error approving meeting request:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.declineMeetingRequest = async (req, res) => {
    const { id } = req.params;

    try {
        const meetingRequest = await meetingService.declineRequest(id);
        if (!meetingRequest) {
            return res.status(404).json({ message: 'Meeting request not found' });
        }
        res.status(200).json({ message: 'Meeting request declined', request: meetingRequest });
    } catch (error) {
        console.error('Error declining meeting request:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Get approved meetings for a specific advisor
// Get pending requests for advisor
exports.getAdvisorRequests = async (req, res) => {
    try {
        const requests = await MeetingRequest.find({
            advisorId: req.params.advisorId,
            status: 'pending'
        });
        res.status(200).json({ requests });
    } catch (error) {
        console.error('Error fetching advisor requests:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get approved meetings for advisor
exports.getAdvisorSchedules = async (req, res) => {
    try {
        const schedules = await MeetingRequest.find({
            advisorId: req.params.advisorId,
            status: 'approved'
        });
        res.status(200).json({ schedules });
    } catch (error) {
        console.error('Error fetching advisor schedules:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get approved meetings for a specific student
exports.getStudentSchedules = async (req, res) => {
    const { studentId } = req.params;

    try {
        const schedules = await MeetingRequest.find({ studentId, status: 'approved' });
        if (!schedules.length) {
            return res.status(404).json({ message: 'No schedules found for this student.' });
        }
        res.status(200).json({ message: 'Schedules retrieved successfully.', schedules });
    } catch (err) {
        console.error('Error retrieving student schedules:', err);
        res.status(500).json({ message: 'Server error while retrieving student schedules.' });
    }
};

// Get all meeting requests for a student
exports.getStudentRequests = async (req, res) => {
    const { studentId } = req.params;

    try {
        const requests = await MeetingRequest.find({ studentId });
        if (!requests.length) {
            return res.status(200).json({ requests: [] });
        }
        res.status(200).json({ requests });
    } catch (err) {
        console.error('Error retrieving student requests:', err);
        res.status(500).json({ message: 'Server error while retrieving requests' });
    }
};


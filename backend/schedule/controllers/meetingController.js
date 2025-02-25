const meetingService = require('../services/meetingServices');
const MeetingRequest = require('../models/meetingRequest');
const sendEmail = require('../utils/email');  // import the email utility



exports.createMeetingRequest = async (req, res) => {
    const { studentName, studentId, advisorId, dateTime } = req.body;

    if (!studentName || !studentId || !advisorId || !dateTime) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newRequest = await meetingService.createMeeting({ studentName, studentId, advisorId, dateTime });
        
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

exports.getAdvisorSchedules = async (req, res) => {
    const { advisorId } = req.params;

    try {
        const schedules = await MeetingRequest.find({ advisorId: advisorId, status: 'approved' });
        if (!schedules.length) {
            return res.status(404).json({ message: 'No schedules found for this advisor.' });
        }
        res.status(200).json({ message: 'Schedules retrieved successfully.', schedules });
    } catch (err) {
        console.error('Error retrieving advisor schedules:', err);
        res.status(500).json({ message: 'Server error while retrieving advisor schedules.' });
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


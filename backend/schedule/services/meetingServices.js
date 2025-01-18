const MeetingRequest = require('../models/meetingRequest');

exports.createMeeting = async (meetingData) => {
    const newRequest = new MeetingRequest(meetingData);
    return await newRequest.save();
};

exports.getRequestsByInstructor = async (instructorId) => {
    return await MeetingRequest.find({ instructorId });
};

exports.approveRequest = async (id) => {
    const meetingRequest = await MeetingRequest.findById(id);
    if (!meetingRequest) return null;

    meetingRequest.status = 'approved';
    return await meetingRequest.save();
};

exports.declineRequest = async (id) => {
    const meetingRequest = await MeetingRequest.findById(id);
    if (!meetingRequest) return null;

    meetingRequest.status = 'declined';
    return await meetingRequest.save();
};



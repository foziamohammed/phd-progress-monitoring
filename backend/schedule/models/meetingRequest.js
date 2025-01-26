const mongoose = require('mongoose');

const meetingRequestSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    studentId: { type: String, required: true },
    advisorId: { type: String, required: true },
    dateTime: { type: Date, required: true },
    status: { type: String, default: 'pending' }, // pending, approved, canceled

}, 
{ timestamps: true });

const MeetingRequest = mongoose.model('MeetingRequest', meetingRequestSchema);

module.exports = MeetingRequest;

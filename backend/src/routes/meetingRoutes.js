const express = require('express');
const meetingController = require('../controllers/meetingController');

const router = express.Router();

// POST: Create a new meeting request
router.post('/createmeeting', meetingController.createMeetingRequest);

// PUT: Approve a meeting request
router.put('/:id/approve', meetingController.approveMeetingRequest);

router.put('/:id/decline', meetingController.declineMeetingRequest);


router.get('/advisors/:advisorId/schedules', meetingController.getAdvisorSchedules);

// Get approved meetings for a specific student
router.get('/students/:studentId/schedules', meetingController.getStudentSchedules);

// Get all meeting requests for a student (approved/pending/declined)
router.get('/students/:studentId/requests', meetingController.getStudentRequests);

// Advisor routes
router.get('/advisors/:advisorId', meetingController.getAdvisorRequests);
router.get('/advisors/:advisorId/schedules', meetingController.getAdvisorSchedules);


module.exports = router;

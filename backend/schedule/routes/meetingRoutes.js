const express = require('express');
const meetingController = require('../controllers/meetingController');

const router = express.Router();

// POST: Create a new meeting request
router.post('/', meetingController.createMeetingRequest);

// GET: Get meeting requests for a specific instructor
router.get('/instructors/:instructorId', meetingController.getInstructorRequests);

// PUT: Approve a meeting request
router.put('/:id/approve', meetingController.approveMeetingRequest);

router.put('/:id/decline', meetingController.declineMeetingRequest);


router.get('/instructors/:instructorId/schedules', meetingController.getInstructorSchedules);

// Get approved meetings for a specific student
router.get('/students/:studentId/schedules', meetingController.getStudentSchedules);


module.exports = router;

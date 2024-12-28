const express = require('express');
const router = express.Router();
const auth  = require("../middlewares/authMiddleware")
const { addMilestone, getMilestones } = require('../controllers/milestoneController');

router.post('/add', auth, addMilestone);
router.get('/get', auth, getMilestones);

module.exports = router;
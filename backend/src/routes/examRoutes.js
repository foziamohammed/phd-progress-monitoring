const express = require('express');
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const { setExamDate, getExamDate } = require('../controllers/examController');

router.post('/set', verifyToken, authorizeRoles("chair"), setExamDate);
router.get('/get', verifyToken, authorizeRoles("student"), getExamDate);

module.exports = router;
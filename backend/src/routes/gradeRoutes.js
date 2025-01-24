const express = require('express');
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const { submitGrade, getGradeImage, approveGradeByPGcoordinator } = require('../controllers/gradeController');

router.post('/submit', verifyToken, authorizeRoles("student"), submitGrade);
router.get('/image/:id', verifyToken, getGradeImage);
router.put('/approve/PGcoordinator/:id', verifyToken, authorizeRoles("PGcoordinator"), approveGradeByPGcoordinator);

module.exports = router;
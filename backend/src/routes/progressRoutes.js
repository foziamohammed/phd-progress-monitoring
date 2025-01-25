const express = require('express');
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const { submitProgress, getProgressFile, approveByAdvisor, approveByChair } = require('../controllers/progressController');

router.post('/submit', verifyToken, authorizeRoles("student"), submitProgress);
router.get('/file/:id', verifyToken, authorizeRoles("advisor", "chair"), getProgressFile);
router.put('/approveByAdvisor/:id', verifyToken, authorizeRoles("advisor"), approveByAdvisor);
router.put('/approveByChair/:id', verifyToken, authorizeRoles("chair"), approveByChair);

module.exports = router; 
const express = require('express');
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const { submitDissertation, getDissertationFile, approveByAdvisor, evaluateDissertation, getResult } = require('../controllers/dissertationController');

router.post('/submit', verifyToken, authorizeRoles("student"), submitDissertation);
router.get('/file/:id', verifyToken, authorizeRoles("advisor", "chair"), getDissertationFile);
router.get('/result/:id', verifyToken, authorizeRoles("dean"), getResult);
router.put('/approveByAdvisor/:id', verifyToken, authorizeRoles("advisor"), approveByAdvisor);
router.put('/evaluate/:id', verifyToken, authorizeRoles("dean"), evaluateDissertation);

module.exports = router; 
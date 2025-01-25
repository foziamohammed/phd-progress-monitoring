const express = require('express');
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const { submitDissertation, getDissertationFile, approveByAdvisor, getResults } = require('../controllers/dissertationController');

router.post('/submit', verifyToken, authorizeRoles("student"), submitDissertation);
router.get('/file/:id', verifyToken, authorizeRoles("advisor", "chair"), getDissertationFile);
router.put('/approveByAdvisor/:id', verifyToken, authorizeRoles("advisor"), approveByAdvisor);
router.get('/results', verifyToken, authorizeRoles("student"), getResults);

module.exports = router; 
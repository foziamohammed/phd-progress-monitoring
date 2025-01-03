const express = require('express');
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const { submitReport, approveReportByAdvisor, approveReportByDean } = require('../controllers/reportController');
const upload = require('../middlewares/upload');

router.post('/submit', verifyToken, authorizeRoles("student"), upload.single('file'), submitReport);
router.put('/approve/advisor/:id', verifyToken, authorizeRoles("advisor"), approveReportByAdvisor);
router.put('/approve/dean/:id', verifyToken, authorizeRoles("dean"), approveReportByDean);

module.exports = router;
const express = require('express');
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const {
    submitReport,
    approveReportByAdvisor,
    approveReportByDean,
    getPendingReportsForAdvisor,
    getPendingReportsForDean
} = require('../controllers/reportController');
const upload = require('../middlewares/upload');

router.post('/submit', verifyToken, authorizeRoles("student"), upload.single('file'), submitReport);
router.put('/approve/advisor/:id', verifyToken, authorizeRoles("advisor"), approveReportByAdvisor);
router.put('/approve/dean/:id', verifyToken, authorizeRoles("dean"), approveReportByDean);
router.get('/pending/advisor', verifyToken, authorizeRoles("advisor"), getPendingReportsForAdvisor);
router.get('/pending/dean', verifyToken, authorizeRoles("dean"), getPendingReportsForDean);

module.exports = router;
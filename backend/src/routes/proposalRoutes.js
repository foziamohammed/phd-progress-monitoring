const express = require('express');
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const { submitProposal, getProposalFile, approveByAdvisor, approveByChair } = require('../controllers/proposalController');

router.post('/submit', verifyToken, authorizeRoles("student"), submitProposal);
router.get('/file/:id', verifyToken, authorizeRoles("advisor", "chair"), getProposalFile);
router.put('/approveByAdvisor/:id', verifyToken, authorizeRoles("advisor"), approveByAdvisor);
router.put('/approveByChair/:id', verifyToken, authorizeRoles("chair"), approveByChair);

module.exports = router; 
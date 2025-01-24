const express = require('express');
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const { submitNote, getNoteFile } = require('../controllers/noteController');

router.post('/submit', verifyToken, authorizeRoles("student"), submitNote);
router.get('/file/:id', verifyToken, getNoteFile);

module.exports = router; 
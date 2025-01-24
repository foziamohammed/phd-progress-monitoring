const express = require('express');
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const {
    submitNote,
} = require('../controllers/noteController');
const upload = require('../middlewares/upload');

router.post('/submit', verifyToken, authorizeRoles("student"), upload.single('file'), submitNote);

module.exports = router;
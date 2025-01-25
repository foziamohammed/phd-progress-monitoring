const express = require('express');
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const { submitPublication, getPublicationFile } = require('../controllers/publicationController');

router.post('/submit', verifyToken, authorizeRoles("student"), submitPublication);
router.get('/file/:id', verifyToken, getPublicationFile);

module.exports = router; 
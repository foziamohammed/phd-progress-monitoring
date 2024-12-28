const express = require('express');
const router = express.Router();
const authrizeRoles = require("../middlewares/roleMiddleware")
const verifyToken = require('../middlewares/authMiddleware');

router.get('/student', verifyToken, authrizeRoles("student"), (req, res) => {
    res.json({ message: "Student" });
});
router.get('/advisor', verifyToken, authrizeRoles("advisor"), (req, res) => {
    res.json({ message: "Advisor" });
});
router.get('/PGcoordinator', verifyToken, authrizeRoles("PGcoordinator"), (req, res) => {
    res.json({ message: "PGcoordinator" });
});
router.get('/chair', verifyToken, authrizeRoles("chair"), (req, res) => {
    res.json({ message: "Chair" });
});
router.get('/dean', verifyToken, authrizeRoles("dean"), (req, res) => {
    res.json({ message: "Dean" });
});
router.get('/PGdirector', verifyToken, authrizeRoles("PGdirector"), (req, res) => {
    res.json({ message: "PGdirector" });
});

module.exports = router;
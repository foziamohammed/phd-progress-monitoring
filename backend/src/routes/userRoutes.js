const express = require('express');
const router = express.Router();
const authorizeRoles = require("../middlewares/roleMiddleware");
const studentApporval = require('../utils/studentApproval');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/student', verifyToken, authorizeRoles("student"), (req, res) => {
    res.json({ message: "Student" });
});
router.get('/advisor', verifyToken, authorizeRoles("advisor"), (req, res) => {
    res.json({ message: "Advisor" });
});
router.get('/PGcoordinator', verifyToken, authorizeRoles("PGcoordinator"), (req, res) => {
    res.json({ message: "PGcoordinator" });
});
router.get('/chair', verifyToken, authorizeRoles("chair"), (req, res) => {
    res.json({ message: "Chair" });
});
router.get('/dean', verifyToken, authorizeRoles("dean"), (req, res) => {
    res.json({ message: "Dean" });
});
router.get('/PGdirector', verifyToken, authorizeRoles("PGdirector"), (req, res) => {
    res.json({ message: "PGdirector" });
});
router.put('/approve/:id', verifyToken, authorizeRoles("advisor"), studentApporval);

module.exports = router;
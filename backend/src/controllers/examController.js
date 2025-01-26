const Exam = require('../models/exam');

const setExamDate = async (req, res) => {
    try {
        const { examDate } = req.body;
        if (!examDate) {
            return res.status(400).json({ message: "Exam date is required" });
        }
        const newExam = await Exam.create({
            examDate
        });
        res.status(201).json({ newExam });
    } catch (error) {
        console.error("Error setting exam date:", error);
        res.status(500).json({ message: "Something went wrong." });
    }
};

const getExamDate = async (req, res) => {
    try {
        const exam = await Exam.findOne({ studentId: req.user.id });
        if (!exam) {
            return res.status(404).json({ message: "Exam date not found" });
        }
        res.status(200).json({ examDate: exam.examDate });
    } catch (error) {
        console.error("Error getting exam date:", error);
        res.status(500).json({ message: "Something went wrong." });
    }
};

module.exports = {
    setExamDate,
    getExamDate
};
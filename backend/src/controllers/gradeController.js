const Grade = require("../models/grade");
const multer = require("multer");
const mime = require("mime-types");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const submitGrade = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Grade image is required" });
        }
        const newGrade = await Grade.create({ 
            studentId: req.user.id, 
            grade: req.file.buffer,
            mimeType: req.file.mimetype 
        });
        res.status(201).json({ newGrade });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

const getGradeImage = async (req, res) => {
    try {
        const grade = await Grade.findById(req.params.id);
        if (!grade || !grade.grade) {
            return res.status(404).json({ message: "Grade not found" });
        }
        res.set('Content-Type', grade.mimeType); 
        res.send(grade.grade);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

const approveGradeByPGcoordinator = async (req, res) => {
    try {
        const grade = await Grade.findById(req.params.id);
        if (!grade) {
            return res.status(404).json({ message: "Grade not found" });
        }
        grade.status = "approvedByPGcoordinator";
        await grade.save();
        res.status(200).json({ message: "Grade approved by advisor" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

module.exports = {
    submitGrade: [upload.single('grade'), submitGrade],
    getGradeImage,
    approveGradeByPGcoordinator,
};
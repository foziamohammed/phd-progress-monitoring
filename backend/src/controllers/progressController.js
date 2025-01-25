const Progress = require("../models/progress");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const submitProgress = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Progress file is required" });
        }
        const newProgress = await Progress.create({
            studentId: req.user.id,
            file: req.file.buffer,
            mimeType: req.file.mimetype,
        });
        res.status(201).json({ newProgress });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const getProgressFile = async (req, res) => {
    try {
        const progress = await Progress.findById(req.params.id);
        if (!progress || !progress.file) {
            return res.status(404).json({ message: "Progress not found" });
        }
        res.set("Content-Type", progress.mimeType);
        res.send(progress.file);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

const approveByAdvisor = async (req, res) => {
    try {
        const grade = await Progress.findById(req.params.id);
        if (!grade) {
            return res.status(404).json({ message: "Progress not found" });
        }
        grade.status = "approvedByAdvisor";
        await grade.save();
        res.status(200).json({ message: "Progress approved by advisor" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

const approveByChair = async (req, res) => {
    try {
        const grade = await Progress.findById(req.params.id);
        if (!grade) {
            return res.status(404).json({ message: "Progress not found" });
        }
        grade.status = "approvedByChair";
        await grade.save();
        res.status(200).json({ message: "Progress approved by chair" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

module.exports = {
    submitProgress: [upload.single('file'), submitProgress],
    getProgressFile,
    approveByAdvisor,
    approveByChair,
};
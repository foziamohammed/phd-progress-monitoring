const Dissertation = require("../models/dissertation");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const submitDissertation = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Dissertation file is required" });
        }
        const newDissertation = await Dissertation.create({
            studentId: req.user.id,
            file: req.file.buffer,
            mimeType: req.file.mimetype,
        });
        res.status(201).json({ newDissertation });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const getDissertationFile = async (req, res) => {
    try {
        const dissertation = await Dissertation.findById(req.params.id);
        if (!dissertation || !dissertation.file) {
            return res.status(404).json({ message: "Dissertation not found" });
        }
        res.set("Content-Type", dissertation.mimeType);
        res.send(dissertation.file);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

const approveByAdvisor = async (req, res) => {
    try {
        const grade = await Dissertation.findById(req.params.id);
        if (!grade) {
            return res.status(404).json({ message: "Dissertation not found" });
        }
        grade.status = "approvedByAdvisor";
        await grade.save();
        res.status(200).json({ message: "Dissertation approved by advisor" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

const evaluateDissertation = async (req, res) => {
    try {
        const dissertation = await Dissertation.findById(req.params.id);
        if (!dissertation) {
            return res.status(404).json({ message: "Dissertation not found" });
        }

        const { result } = req.body;
        if (!result) {
            return res.status(400).json({ message: "Result is required" });
        }

        dissertation.result = result;
        await dissertation.save();
        res.status(200).json({ message: "Dissertation result updated", dissertation });
    } catch (error) {
        console.error("Error evaluating dissertation:", error);
        res.status(500).json({ message: "Something went wrong." });
    }
};

const getResult = async (req, res) => {
    try {
        const dissertation = await Dissertation.findById(req.params.id);
        if (!dissertation) {
            return res.status(404).json({ message: "Dissertation not found" });
        }
        const results = dissertation.result;
        res.status(200).json({ results });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
}
module.exports = {
    submitDissertation: [upload.single('file'), submitDissertation],
    getResult,
    getDissertationFile,
    approveByAdvisor,
    evaluateDissertation
};
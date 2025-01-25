const Proposal = require("../models/proposal");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const submitProposal = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Proposal file is required" });
        }
        const newProposal = await Proposal.create({
            studentId: req.user.id,
            file: req.file.buffer,
            mimeType: req.file.mimetype,
        });
        res.status(201).json({ newProposal });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const getProposalFile = async (req, res) => {
    try {
        const proposal = await Proposal.findById(req.params.id);
        if (!proposal || !proposal.file) {
            return res.status(404).json({ message: "Proposal not found" });
        }
        res.set("Content-Type", proposal.mimeType);
        res.send(proposal.file);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

const approveByAdvisor = async (req, res) => {
    try {
        const grade = await Proposal.findById(req.params.id);
        if (!grade) {
            return res.status(404).json({ message: "Proposal not found" });
        }
        grade.status = "approvedByAdvisor";
        await grade.save();
        res.status(200).json({ message: "Proposal approved by advisor" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

const approveByChair = async (req, res) => {
    try {
        const grade = await Proposal.findById(req.params.id);
        if (!grade) {
            return res.status(404).json({ message: "Proposal not found" });
        }
        grade.status = "approvedByChair";
        await grade.save();
        res.status(200).json({ message: "Proposal approved by chair" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

module.exports = {
    submitProposal: [upload.single('file'), submitProposal],
    getProposalFile,
    approveByAdvisor,
    approveByChair,
};
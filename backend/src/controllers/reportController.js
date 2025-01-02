const Report = require("../models/report");

const submitReport = async (req, res) => {
    try {
        const { fileUrl } = req.body;
        if (!fileUrl) {
            return res.status(400).json({ message: "File URL is required" });
        }
        const report = await Report.create({ studentId: req.user.id, fileUrl });
        res.status(201).json({ report });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

const approveReportByAdvisor = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) {
            return res.status(404).json({ message: "Report not found" });
        }
        report.status = "approvedByAdvisor";
        await report.save();
        res.status(200).json({ message: "Report approved by advisor" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

const approveReportByDean = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) {
            return res.status(404).json({ message: "Report not found" });
        }
        if (report.status !== "approvedByAdvisor") {
            return res.status(400).json({ message: "Report must be approved by advisor first" });
        }
        report.status = "approvedByDean";
        await report.save();
        res.status(200).json({ message: "Report approved by dean" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

module.exports = { submitReport, approveReportByAdvisor, approveReportByDean };
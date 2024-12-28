const Milestone = require("../models/milestone");

const addMilestone = async (req, res) => {
    try {
        console.log(req.user._id)
        const { title, description, dueDate, status } = req.body;
        const milestone = await Milestone.create({ userId: req.user._id, title, description, dueDate, status });
        console.log(title)
        res.status(201).json({ milestone });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

const getMilestones = async (req, res) => {
    try {
        const milestones = await Milestone.find({ userId: req.user._id });
        res.status(200).json({ milestones });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

module.exports = { addMilestone, getMilestones };
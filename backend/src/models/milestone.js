const mongoose = require("mongoose");

const milestoneSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending",
    },
});

const Milestone = mongoose.model("Milestone", milestoneSchema);
module.exports = Milestone;
const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    fileUrl: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "approvedByAdvisor", "approvedByDean"],
        default: "pending",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;
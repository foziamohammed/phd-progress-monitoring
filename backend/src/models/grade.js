const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    grade: {
        type: Buffer,
        required: true,
    },
    mimeType: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ["pending", "approvedByPGcoordinator"],
        default: "pending",
    },
});

const Grade = mongoose.model("Grade", gradeSchema);
module.exports = Grade; 
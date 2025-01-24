const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    file: {
        type: Buffer,
        required: true,
    },
    mimeType: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
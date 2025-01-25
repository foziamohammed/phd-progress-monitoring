const mongoose = require("mongoose");

const publicationSchema = new mongoose.Schema({
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

const Publication = mongoose.model("Publication", publicationSchema);
module.exports = Publication;
const Note = require("../models/note");

const submitNote = async (req, res) => {
    try {
        const { fileUrl } = req.body;
        if (!fileUrl) {
            return res.status(400).json({ message: "File URL is required" });
        }
        const note = await note.create({ studentId: req.user.id, fileUrl });
        res.status(201).json({ note });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

module.exports = {
    submitNote,
};
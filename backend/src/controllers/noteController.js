const Note = require("../models/note");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const submitNote = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Note file is required" });
        }
        const newNote = await Note.create({
            studentId: req.user.id,
            file: req.file.buffer,
            mimeType: req.file.mimetype,
        });
        res.status(201).json({ newNote });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

const getNoteFile = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note || !note.file) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.set("Content-Type", note.mimeType);
        res.send(note.file);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

module.exports = {
    submitNote: [upload.single('file'), submitNote],
    getNoteFile,
};
const Publication = require("../models/publication");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const submitPublication = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Publication file is required" });
        }
        const newPublication = await Publication.create({
            studentId: req.user.id,
            file: req.file.buffer,
            mimeType: req.file.mimetype,
        });
        res.status(201).json({ newPublication });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

const getPublicationFile = async (req, res) => {
    try {
        const publication = await Publication.findById(req.params.id);
        if (!publication || !publication.file) {
            return res.status(404).json({ message: "Publication not found" });
        }
        res.set("Content-Type", publication.mimeType);
        res.send(publication.file);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

module.exports = {
    submitPublication: [upload.single('file'), submitPublication],
    getPublicationFile,
};
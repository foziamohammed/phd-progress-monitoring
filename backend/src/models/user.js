const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        unique: true,
    },
    role: {
        type: String,
        enum: ["student", "advisor", "PGcoordinator", "chair", "dean", "PGdirector", "admin"],
        default: "user",
    },
    phone: {
        type: String,
        required: [true, "Please add a phone number"],
        unique: true,
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
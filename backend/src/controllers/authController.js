const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password, role, phone });
        res.status(201).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
}; 

module.exports = { register, login };

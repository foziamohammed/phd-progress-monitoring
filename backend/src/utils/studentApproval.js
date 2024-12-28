const User = require("../models/User");

const studentApporval = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.isApproved = true;
        await user.save();
        res.status(200).json({ message: "User approved successfully" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
}

module.exports = studentApporval;

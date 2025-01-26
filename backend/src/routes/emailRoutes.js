const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/send-email", async (req, res) => {
    const { firstName, lastName, email, phone, subject, message } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"${firstName} ${lastName}" <${email}>`,
            to: "foziam139@gmail.com",
            subject: `New Message - ${subject}`,
            text: `
            Name: ${firstName} ${lastName}
            Email: ${email}
            Phone: ${phone}
            Subject: ${subject}
            Message:
            ${message}
            `,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Failed to send email." });
    }
});

module.exports = router;

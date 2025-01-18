// utils/email.js
const nodemailer = require('nodemailer');

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail', // or another email service like 'outlook'
  auth: {
    user: 'Meazialemayehu16@gmail.com',  // Your email
    pass: 'Me@zatadele21',   // Your email password or App-specific password (see Step 5 for security)
  },
});

// Function to send an email
const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: 'meazialemayehu16@gmail.com',
    to: to,
    subject: subject,
    text: text,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;

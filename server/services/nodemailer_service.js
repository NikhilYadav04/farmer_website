const nodemailer = require("nodemailer");
require("dotenv").config();

// transporter object is create dusing smtp protocol simple mail transfer protocol
var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS,
  },
});

const mailOptions = (senderEmail, userName, resetLink) => ({
  from: {
    name: "Nikhil Yadav",
    address: process.env.NODEMAILER_EMAIL,
  },
  to: [senderEmail],
  subject: "Action Required: Reset Your Password for User",
  text: `Password Reset Request

        Hello ${userName},

        We received a request to reset your password for your account. If you did not request this, please ignore this email.

        To reset your password, visit the link below:
        ${resetLink}

        Thank you,
        The Website Team`,
  html: "<b>Hello world</b>",
});

module.exports = { transporter, mailOptions };

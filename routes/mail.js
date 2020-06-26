require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/send", (req, res) => {
    const data = req.body;
    const smtpTransport = nodemailer.createTransport({
        host: "smtp.hostinger.com",
        port: 587,
        secure: false,
        auth: {
            user: "contact@sagekozub.com",
            pass: process.env.EMAIL_PASS,
        },
    });
    const mailOptions = {
        from: "contact@sagekozub.com",
        to: "contact@sagekozub.com",
        subject: data.subject,
        html: `You've received the following message from ${data.name}(${data.email}):\n
        ${data.message}\n
        Sent from sagekozub.com`,
    };
    smtpTransport
        .sendMail(mailOptions)
        .then((res) => {
            console.log(res);
        })
        .catch((error) => {
            console.error("sendMail error", error);
        });
    smtpTransport.close();
});

module.exports = router;

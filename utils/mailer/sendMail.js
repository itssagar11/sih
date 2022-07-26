nodeMailer = require('nodemailer'); 
require("dotenv").config();
nodeMailerConfig = require("./nodeMailerConfig");

sendEmail = async ({ to, subject, html }) => {
    const transporter = nodeMailer.createTransport(nodeMailerConfig);
    return transporter.sendMail({
        from: `${process.env.MAIL_USER}`,
        to,
        subject,
        html
    });
}

module.exports = sendEmail;
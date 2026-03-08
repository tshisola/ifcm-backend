const nodemailer = require("nodemailer");

async function sendEmail(to, subject, text) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yourgmail@gmail.com",
      pass: "app_password"
    }
  });

  await transporter.sendMail({
    from: '"IFCM" <yourgmail@gmail.com>',
    to,
    subject,
    text
  });
}

module.exports = sendEmail;
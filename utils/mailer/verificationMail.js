sendMail = require("./sendMail");

const verificationMail = async ({ name, email, verificationToken, origin }) => {
  const verifyEmail = `${origin}/api/v1/auth/verifyMail?token=${verificationToken}&email=${email}`;
  const message = `<p>Please confirm your email by clicking on the following link : <a href="${verifyEmail}">Verify Email</a> </p>`;
console.log(verifyEmail);
  return sendEmail({
    to: email,
    subject: "Email Verification",
    html: `<h4> Hello, ${name}</h4>
    ${message}`
  });

}

module.exports = verificationMail;
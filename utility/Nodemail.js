const nodemailer = require("nodemailer");

const sendMail = () => {
  const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "csejnu@outlook.com",
      pass: "@CSE%20JnU",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const options = {
    from: "maddison53@ethereal.email",
    to: "maddison.watson@gmail.com",
    subject: "Hello!",
    html: `
        <h1>Hi, I am a test mail</h1>
        <p>This is just a simple test mail</p>
      `,
  };
  transporter.sendMail(options, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendMail;

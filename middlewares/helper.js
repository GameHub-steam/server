const nodemailer = require("nodemailer");
require("dotenv").config();
const sendemail = async () => {
  
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EmailSender,
        pass: 'otsp vrqp gutq rsbi'
      }
    });
    const mailOptions = { from: process.env.EmailSender, "to": process.env.Emailreceiver, "subject":"test", "text":"test" };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) { console.log(error);
       }
      console.log('Email sent: ' + info.response);
    });
  } catch (error) {
    console.log(error,'❌❌');
  }
};

module.exports = { sendemail };

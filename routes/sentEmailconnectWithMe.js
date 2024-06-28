const { Router } = require('express');
const router = Router();
const nodemailer = require('nodemailer');

// Use dotenv to load environment variables
require('dotenv').config();
const myEmail = process.env.EMAIL;
const myPassword = process.env.PASSWORD;

console.log('EMAIL:', myEmail);  // Debugging
console.log('PASSWORD:', myPassword);  // Debugging

router.post('/connetMesendEmail', async (req, res) => {
  try {
    // Mail config
    let config = {
      service: 'gmail',
      auth: {
        user: myEmail,
        pass: myPassword,
      },
    };

    console.log('Config:', config); // Debugging
    console.log('Req:', req.body); // Debugging

    let transporter = nodemailer.createTransport(config);

    // Email format config to sent to user
    const mailOptionsToUser = {
      from: myEmail,
      to: req.body.email,
      subject: 'Your Query Has Been Noted - Agnibha',
      html: `
      <p>Hello ${req.body.fullname},</p>
      <p>Thank you for reaching out. Your message has been noted, and I will get back to you as soon as I am available.</p>
      <p>Best regards,<br>Agnibha Chowdhury</p>
      <img style="width: 5%" 
      src="https://dl.dropboxusercontent.com/scl/fi/170x99e2bpnz6vld31rgy/Customer-service-chat.gif?rlkey=p7sbo5gerxq924fkln1kmenb9&st=jakmvduy&dl=0" 
      alt="Thanks">
    `
    };

    // Email format config to sent to me 
    const mailOptionsToMe = {
      from: myEmail,
      to: myEmail,
      subject: `Query from ${req.body.fullname}`,
      html: `
        <p>Hello,</p>
        <p>Below is the message from ${req.body.fullname}.</p>
        <p>Please reply to them within 24 hours.</p>
        <table border="1" style="border-collapse: collapse;">
          <tr>
            <th style="text-align: left; padding: 5px; color: white; background-color:black">Fullname</th>
            <td style="text-align: left; padding: 5px">${req.body.fullname}</td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 5px; color: white; background-color:black">Email</th>
            <td style="text-align: left; padding: 5px">${req.body.email}</td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 5px; color: white; background-color:black">Subject</th>
            <td style="text-align: left; padding: 5px">${req.body.subject}</td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 5px; color: white; background-color:black">Message</th>
            <td style="text-align: left; padding: 5px">${req.body.message}</td>
          </tr>
        </table>
        <img style="width: 5%" 
        src="https://dl.dropboxusercontent.com/scl/fi/170x99e2bpnz6vld31rgy/Customer-service-chat.gif?rlkey=p7sbo5gerxq924fkln1kmenb9&st=jakmvduy&dl=0" 
        alt="Thanks">
        <p style="padding: 0px;">Thanks,<br>The code which still works.</p>
      `
    };

    // Sending the email to user
    const userEmailPromise = transporter.sendMail(mailOptionsToUser);
    const meEmailPromise = transporter.sendMail(mailOptionsToMe);

    await Promise.all([userEmailPromise, meEmailPromise]);

    // Sending response
    res.json({
      message: 'Email is sent successfully',
    });

  } catch (error) {
    console.error('Error in sending email:', error);
    res.status(500).json({ message: 'An error occurred during email sending.' });
  }
});

module.exports = router;

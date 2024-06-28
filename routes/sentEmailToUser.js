const { Router } = require('express');
const router = Router();

// Use dotenv to load environment variables
require('dotenv').config();

const nodemailer = require('nodemailer');


const myEmail = process.env.email;
const myPassword = process.env.password;


router.post('/sendEmail', async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(400).json({ message: 'Email address is required.' });
    }

    // Mail config
    let config = {
      service: 'gmail',
      auth: {
        user: myEmail,
        pass: myPassword,
      },
    };

    let transporter = nodemailer.createTransport(config);

    // Email format config to send to user
    const mailOptionsToUser = {
      from: myEmail,
      to: req.body.email,
      subject: 'Resume Password request for Agnibha',
      html: `
      <p>Hello,</p>
      <p>Thank you for requesting the password to my resume. I will email you the password after careful consideration within 24 hours.</p>
      <p>Thank you for your patience,<br>Agnibha</p>
      <img style="margin: 5px 5px 0px 0px; width: 5%" 
      src="https://dl.dropboxusercontent.com/scl/fi/170x99e2bpnz6vld31rgy/Customer-service-chat.gif?rlkey=p7sbo5gerxq924fkln1kmenb9&st=jakmvduy&dl=0" 
      alt="Thanks">
    `
    };

    // Email format config to send to me
    const mailOptionsToMe = {
      from: myEmail,
      to: myEmail,
      subject: 'Resume Password Request',
      text: `Hello,
You resume is downloaded by ${req.body.email}.
Please analyze to see if the user is correct to give the password for the ZIP file.

Thanks,
The code which still works.`
    };

    // Sending both emails in parallel
    await Promise.all([
      transporter.sendMail(mailOptionsToUser),
      transporter.sendMail(mailOptionsToMe)
    ]);

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

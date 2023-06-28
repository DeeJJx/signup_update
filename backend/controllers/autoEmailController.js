const nodeMailer = require('nodemailer');

const sendAutoEmail = async (req, res) => {

    const mailOptions = {
        from: 'twennyCommunication@gmail.com',
        to: 'j-j0001@hotmail.com',
        subject: 'Hello from Node.js',
        text: 'This is the body of the email'
    };

    
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'twennyCommunication@gmail.com',
            pass: 'jdzkodkprlonwvdq'
        }
    });  

    try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    res.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
}

module.exports = {
    sendAutoEmail
}


const nodeMailer = require('nodemailer');

const sendAutoEmail = async (req, res) => {

    const userDetails = JSON.stringify(req.body);

    const mailOptions = {
        from: 'twennyCommunication@gmail.com',
        to: ['j-j0001@hotmail.com', 'daniel.turnbull94@gmail.com'],
        subject: 'User details test',
        text: userDetails
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


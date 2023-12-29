const nodeMailer = require('nodemailer');

   
const transporter = nodeMailer.createTransport({ //moved to be a global constant
    service: 'gmail',
    auth: {
        user: 'twennyCommunication@gmail.com',
        pass: 'jdzkodkprlonwvdq'
    }
});  

const sendAutoEmail = async (req, res) => {

    const userDetails = JSON.stringify(req.body);

    const mailOptions = {
        from: 'twennyCommunication@gmail.com',
        // to: ['j-j0001@hotmail.com', 'daniel.turnbull94@gmail.com'],
        to: ['j-j0001@hotmail.com'],
        subject: 'User details test',
        text: userDetails
    };


    try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    res.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
}

const sendContactEmail = async (req, res) => {

    const { name, email, message } = req.body;

    try {
        await transporter.sendMail({
            from: 'twennyCommunication@gmail.com',
            to: ['j-j0001@hotmail.com', 'daniel.turnbull94@gmail.com'],
            subject: 'Contact Form Submission',
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        });

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error occurred while sending email:', error);
    res.status(500).json({ error: 'Failed to send email.' });
  }
}

module.exports = {
    sendAutoEmail,
    sendContactEmail,
}


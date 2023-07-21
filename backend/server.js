require('dotenv').config();

const mainUserRoutes = require('./routes/user');
const earlyAccessUserRoutes = require('./routes/earlyAccessUser');
const stripeRoutes = require('./routes/stripe');
const emailRoutes = require('./routes/autoEmail');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000; // Use your preferred port number or fallback to 5000

// Middleware
app.use(express.json());
app.use(cors());

// Serve your static files or handle other routes here
app.use(express.static('public'));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'twenny@gmail.com', 
    pass: 'PASSWORD' // Will need to change this to match password once set up
  }
});

// Endpoint to handle email sending
app.post('/api/send-email', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: 'twenny@gmail.com', // Not sure if this is correct, may interfere with order success email etc.
    to: 'twenny@gmail.com',
    subject: 'Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send email' });
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Email sent successfully' });
    }
  });
});

// Routes
app.use('/api/user', mainUserRoutes);
app.use('/api/early-access', earlyAccessUserRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/email', emailRoutes);

app.get('/', (req, res) => {
  console.log("we're connected");
  res.json({ msg: 'this is a message' });
});

// Connect to the database
mongoose
  .connect(process.env.DBURI)
  .then(() => {
    app.listen(PORT, () => {
      console.log('Server listening on port', PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
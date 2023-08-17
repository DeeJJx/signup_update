require('dotenv').config();

const mainUserRoutes = require('./routes/user');
const earlyAccessUserRoutes = require('./routes/earlyAccessUser');
const stripeRoutes = require('./routes/stripe');
const emailRoutes = require('./routes/autoEmail');
const genRoutes = require('./routes/siteGen');
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

// Routes
app.use('/api/user', mainUserRoutes);
app.use('/api/early-access', earlyAccessUserRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/gen', genRoutes);

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
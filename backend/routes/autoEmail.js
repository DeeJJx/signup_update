const express = require('express');

const router = express.Router();

//controller function
const { sendAutoEmail, sendContactEmail } = require('../controllers/autoEmailController');

router.post('/send-confirmation', sendAutoEmail);

router.post('/send-contact-email', sendContactEmail);

module.exports = router;
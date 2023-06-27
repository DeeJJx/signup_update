const express = require('express');

const router = express.Router();

//controller function
const { sendAutoEmail } = require('../controllers/autoEmailController');

router.post('/send-confirmation', sendAutoEmail);

module.exports = router;
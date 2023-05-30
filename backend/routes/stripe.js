const express = require('express');

const router = express.Router();

//controller functions
const { createCheckoutSession } = require('../controllers/stripeController');

//signup route
router.post('/create-checkout-session', createCheckoutSession);

module.exports = router;
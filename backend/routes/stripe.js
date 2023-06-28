const express = require('express');
const bodyParser = require('body-parser');


const router = express.Router();

//controller functions
const {
     createCheckoutSession,
     fulfillOrderFromCheckout
} = require('../controllers/stripeController');



//signup route
router.post('/create-checkout-session', createCheckoutSession);
// router.post('/fulfill-order-from-checkout', fulfillOrderFromCheckout);
router.post('/webhook', bodyParser.raw({type: 'application/json'}), fulfillOrderFromCheckout);

module.exports = router;
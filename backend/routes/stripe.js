const express = require('express');
const bodyParser = require('body-parser');


const router = express.Router();

//controller functions
const {
     createCheckoutSession,
     fulfillOrderFromCheckout,
     basicWebhook
} = require('../controllers/stripeController');



//signup route
router.post('/create-checkout-session', createCheckoutSession);
// router.post('/fulfill-order-from-checkout', fulfillOrderFromCheckout);
router.post('/webhook', bodyParser.raw({type: 'application/json'}), fulfillOrderFromCheckout);
router.post('/basic-webhook', bodyParser.raw({type: 'application/json'}), basicWebhook);
// router.post('/basic-webhook', basicWebhook);

module.exports = router;
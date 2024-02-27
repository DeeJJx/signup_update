const stripe = require('stripe')(process.env.STRIPEKEY);
const endpointSecret = process.env.endpointSecret;
const { updateUser } = require('../controllers/userController');

const createCheckoutSession = async(req, res) => {

      // Get the selected product ID from the frontend
      const { productId } = req.body;

      console.log(productId)
  
      // Define a mapping of product IDs to prices
      const priceMap = {
          bricky_id: 'price_1OiyBiJVu65LdnVcb2nlNBlF',
          sub_id: 'price_1Oiy99JVu65LdnVcrO25wNfa',
          // Add more product IDs and their corresponding prices here
        };
      
      //   Get the price based on the selected product ID
        const price = priceMap[productId];
  
        console.log(price);
      
        if (!price) {
          // Handle invalid product ID
          return res.status(400).json({ error: 'Invalid product selected' });
        }

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: 'price_1OiyBiJVu65LdnVcb2nlNBlF',
                    quantity: 1,
                },
                {
                    price: 'price_1Oiy99JVu65LdnVcrO25wNfa',
                    quantity: 1
                }
            ],
            mode: 'subscription',
            success_url: `http://localhost:3000/order-success?success=true`,
            cancel_url: `http://localhost:3000/order-success?cancelled=true`,
        });
        
        res.json({
            url: session.url,
            sessionData: session
        });
}
    

// This is your Stripe CLI webhook secret for testing your endpoint locally.

const fulfillOrderFromCheckout = (req, res) => {
    const payload = req.body;
    console.log("Got payload: " + payload["gotApp"]);

    res.status(200).end();
}


const basicWebhook = (req, res) => {  
        let event = req.body;
      
        if (endpointSecret) {
            // Get the signature sent by Stripe
            const signature = req.headers['stripe-signature'];
            try {
              event = stripe.webhooks.constructEvent(
                req.body,
                signature,
                endpointSecret
              );
            } catch (err) {
              console.log(`⚠️  Webhook signature verification failed.`, err.message);
              return res.sendStatus(400);
            }
        }

         // Handle the event
        switch (event.type) {
            case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
            // Then define and call a method to handle the successful payment intent.
            // handlePaymentIntentSucceeded(paymentIntent);
            break;
            case 'payment_method.attached':
            const paymentMethod = event.data.object;
            // Then define and call a method to handle the successful attachment of a PaymentMethod.
            // handlePaymentMethodAttached(paymentMethod);
            break;
            case 'customer.subscription.created':
                const subscriptionId = event.data.object;
                const req = {
                    params: {
                        id: '65b50cd855db2f169f76cd9c',
                    },
                    subscriptionId: subscriptionId.id,
                };
                // console.log(subscriptionId);
                //update DB with users subscription ID (used to cancel)
                updateUser(req);
            break;
            default:
            // Unexpected event type
            console.log(`Unhandled event type ${event.type}.`);
        }

        // Return a 200 res to acknowledge receipt of the event
        res.send();
}


module.exports = {
    createCheckoutSession,
    fulfillOrderFromCheckout,
    basicWebhook,
};
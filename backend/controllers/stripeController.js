const stripe = require('stripe')(process.env.STRIPEKEY);
const bodyParser = require('body-parser');

const createCheckoutSession = async(req, res) => {

      // Get the selected product ID from the frontend
      const { productId } = req.body;

      console.log(productId)
  
      // Define a mapping of product IDs to prices
      const priceMap = {
          bricky_id: 'price_1NA7O1JVu65LdnVcBljr473q',
          sub_id: 'price_1NA64tJVu65LdnVcfgUwbhUA',
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
                    price: 'price_1NA7O1JVu65LdnVcBljr473q',
                    quantity: 1,
                },
                {
                    price: 'price_1NA64tJVu65LdnVcfgUwbhUA',
                    quantity: 1
                }
            ],
            mode: 'subscription',
            success_url: `http://localhost:3000/order-success`,
            cancel_url: `http://localhost:3000/order-preview`,
        });
        
        res.json({url: session.url});
}
    

    // This is your Stripe CLI webhook secret for testing your endpoint locally.
// const endpointSecret = "whsec_a1fecb7bf3b832a22347c8b0c3ed6caef8b59aeefbf334a372d6e60e833dd4b2";

const fulfillOrderFromCheckout = (req, res) => {
    const payload = req.body;
    console.log("Got payload: " + payload)

    res.status(200).end();
}



module.exports = {
    createCheckoutSession,
    fulfillOrderFromCheckout
}




// app.post('/webhook', bodyParser.raw({type: 'application/json'}), (request, response) => {
//   const payload = request.body;

//   console.log("Got payload: " + payload);

//   response.status(200).end();
// });

// app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
//     const sig = request.headers['stripe-signature'];
  
//     let event;
  
//     try {
//       event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
//     } catch (err) {
//       response.status(400).send(`Webhook Error: ${err.message}`);
//       return;
//     }
  
//     // Handle the event
//     switch (event.type) {
//       case 'payment_intent.succeeded':
//         const paymentIntentSucceeded = event.data.object;
//         // Then define and call a function to handle the event payment_intent.succeeded
//         break;
//       // ... handle other event types
//       default:
//         console.log(`Unhandled event type ${event.type}`);
//     }
  
//     // Return a 200 response to acknowledge receipt of the event
//     response.send();
//   });
require('dotenv').config();

const mainUserRoutes = require('./routes/user');
const earlyAccessUserRoutes = require('./routes/earlyAccessUser');
const stripeRoutes = require('./routes/stripe');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();

//middleware
app.use(express.json());
app.use(cors());
// Serve your static files or handle other routes here
app.use(express.static('public'));


app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

//routes
app.use('/api/user',mainUserRoutes);
app.use('/api/early-access', earlyAccessUserRoutes);
app.use('/api/stripe', stripeRoutes)





app.get("/", (req, res) => {
    console.log("we're connected");
    res.json({msg: "this is a message"});
})

// app.post('/create-checkout-session', async (req, res) => {
//     // Get the selected product ID from the frontend
//     const { productId } = req.body;

//     console.log(productId)

//     // Define a mapping of product IDs to prices
//     const priceMap = {
//         bricky_id: 'price_1NA7O1JVu65LdnVcBljr473q',
//         sub_id: 'price_1NA64tJVu65LdnVcfgUwbhUA',
//         // Add more product IDs and their corresponding prices here
//       };
    
//     //   Get the price based on the selected product ID
//       const price = priceMap[productId];

//       console.log(price);
    
//       if (!price) {
//         // Handle invalid product ID
//         return res.status(400).json({ error: 'Invalid product selected' });
//       }

    //   try {
    //     const session = await stripe.checkout.sessions.create({
    //       mode: "subscription",
    //       line_items: [
    //         {
    //           price: price,
    //           quantity: 1,
    //         },
    //       ],
    //       // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
    //     success_url: `https://localhost:4000/order-success`,
    //     cancel_url: `https://localhost:4000/order-preview`,
    //       // automatic_tax: { enabled: true }
    //     });
    
    //     return res.redirect(303, session.url);
    //   } catch (e) {
    //     res.status(400);
    //     return res.send({
    //       error: {
    //         message: e.message,
    //       }
    //     });
    //   }
    // });

    
// const session = await stripe.checkout.sessions.create({
//     line_items: [
//         {
//             price: price,
//             quantity: 1,
//         },
//         {
//             price: 'price_1NA64tJVu65LdnVcfgUwbhUA',
//             quantity: 1
//         }
//     ],
//     mode: 'subscription',
//     success_url: `http://localhost:4000/order-success`,
//     cancel_url: `http://localhost:4000/order-preview`,
// });

// res.redirect(303, session.url);
// // res.redirect({url: session.url});
// // res.redirect(session.url);
// })
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
//connect to db

mongoose.connect(process.env.DBURI)
    .then(() => {
        app.listen(process.env.PORT, (req, res) => {
            console.log('this is port ', process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error);
    })
require('dotenv').config();

const mainUserRoutes = require('./routes/user');
const earlyAccessUserRoutes = require('./routes/earlyAccessUser');
const mongoose = require('mongoose');
const express = require('express');

const stripe = require('stripe')(process.env.STRIPEKEY);

const app = express();

//middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

//routes
app.use('/api/user',mainUserRoutes);
app.use('/api/early-access', earlyAccessUserRoutes);


app.get("/", (req, res) => {
    console.log("we're connected");
    res.json({msg: "this is a message"});
})

app.post('/create-checkout-session', async (req, res) => {
const session = await stripe.checkout.sessions.create({
    line_items: [
        {
            price:'price_1NA7O1JVu65LdnVcBljr473q',
            quantity: 1,
        },
        {
            price: 'price_1NA64tJVu65LdnVcfgUwbhUA',
            quantity: 1
        }
    ],
    mode: 'subscription',
    success_url: `http://localhost:4000/order-success`,
    cancel_url: `http://localhost:4000/order-preview`,
});

res.redirect(303, session.url);
})
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
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
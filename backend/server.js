require('dotenv').config();

const mainUserRoutes = require('./routes/user');
const mongoose = require('mongoose');
const express = require('express');

const app = express();

//middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

//routes
app.use('/api/user',mainUserRoutes);


app.get("/", (req, res) => {
    console.log("we're connected");
    res.json({msg: "this is a message"});
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
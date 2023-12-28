const express = require('express');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const createError = require('http-errors')
const app = express();
const xssClean = require('xss-clean')
const rateLimit = require('express-rate-limit');

// set rate limit,... how many time a user can hit the route
const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5,
    message: "Too Mant request from this IP address. Please try later"
})

// middleware
app.use(rateLimiter)
app.use(xssClean());
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))



app.get("/", (req, res) => {
    res.status(200).json({ message: "Hi home route..... fine" })
})
app.get("/api/user",  (req, res) => {
    console.log("id from loggedIn", req.body.id)
    res.status(200).send({ message: "User profile return" })
})





// client error handliing
app.use((req, res, next) => {
    // res.status(404).json({ message: "Route is not found" })
    next(createError(404,"Route is not found"))
})
// server error handliing -->> all errors handles
app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({
        success: false,
        message: err.message
    })
})

module.exports = app;
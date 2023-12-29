const express = require('express');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const createError = require('http-errors')
const app = express();
const xssClean = require('xss-clean')
const rateLimit = require('express-rate-limit');
const userRouter = require('./routers/userRouter');

// set rate limit,... how many time a user can hit the route
const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // how many time user can requst in the route
    message: "Too Mant request from this IP address. Please try later" // error message
})

// middleware
app.use(rateLimiter)
app.use(xssClean());
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// user router
app.use('/api/users' ,userRouter)



app.get("/", (req, res) => {
    res.status(200).json({ message: "Hi home route..... fine" })
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
const express = require('express');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const createError = require('http-errors')
const app = express();

// middleware
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

app.get("/products", (req, res) => {
    res.status(200).json({ message: "products are come back on the market" })

})
app.post("/products", (req, res) => {
    res.status(200).json({ message: "products post request are come back on the market" })

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
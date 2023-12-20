const express = require('express');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const app = express();

// middleware
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const isLoggedIn = (req,res,next) =>{
// console.log("isLoggedIn Middleware")
const login = true;

if(login){
    req.body.id = 101;
    next()
}else{
    return res.status(401).json({message:"Unauthorizaed User"})
}

}

app.get("/",(req,res) =>{
    res.status(200).json({message: "Hi home route..... fine"})
})
app.get("/api/user",isLoggedIn,(req,res) =>{
    console.log("id from loggedIn",req.body.id)
    res.status(200).send({message: "User profile return"})
})

app.get("/products",(req,res) =>{
    res.status(200).json({message: "products are come back on the market"})
   
})
app.post("/products",(req,res) =>{
    res.status(200).json({message: "products post request are come back on the market"})
   
})

app.listen(3001, () =>{
    console.log(` server is runing at http://localhost:3001`)
} )
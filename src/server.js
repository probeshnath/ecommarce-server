const express = require('express');
const app = express();

app.get("/",(req,res) =>{
    res.status(200).json({message: "Hi home route..... fine"})
})

app.get("/products",(req,res) =>{
    res.status(200).json({message: "products are come back on the market"})
   
})

app.listen(3001, () =>{
    console.log(` server is runing at http://localhost:3001`)
} )
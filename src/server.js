const express = require('express');
const app = express();

app.get("/",(req,res) =>{
    res.send("Hi home route")
})

app.listen(3001, () =>{
    console.log(` server is runing at http://localhost:3001`)
} )
const mongoose = require('mongoose');
const { mongoDB_url } = require('../secret');

const connectionDB = async (options = {}) =>{
   try {
     await mongoose.connect(mongoDB_url,options);
     console.log('Connection DB successfully')

     mongoose.connection.on('error',(error) =>{
        console.error('DB connection error', error)
     })
   } catch (error) {
    console.error('Could not connection with DB', error.toString())
   } 
}

module.exports = connectionDB;
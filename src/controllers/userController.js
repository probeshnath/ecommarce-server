const createError = require('http-errors')
const User = require('../models/userModel')

// get user 
const getUsers = async  (req, res,next) => {
    
    try {
        const users = await User.find()
        res.status(200).send({ 
            message: "Users were return",
            users
         })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getUsers
}
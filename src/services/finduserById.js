const createError = require('http-errors')
const User = require("../models/userModel")
const mongoose  = require('mongoose');

const findUserById = async (id, options) => {
    try {
        // password hide
        const options = {
            password: 0
        }
        // find
        const user = await User.findById(id, options)

        // error 
        if (!user) { throw createError(404, 'No user found') }

        // return user if get user
        return user;

    } catch (error) {
        // invaliid error from mongoose
        if (error instanceof mongoose.Error) {
          createError(400, "Invalid User Id")
          
        }
        throw error;
    }
}

module.exports = { findUserById }
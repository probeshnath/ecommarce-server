const createError = require('http-errors')
const User = require("../models/userModel")
const mongoose  = require('mongoose');

const findWithId = async (id, options) => {
    try {
        // password hide
        // const options = {
        //     password: 0
        // }
        // find
        const item = await User.findById(id, options)

        // error 
        if (!item) { throw createError(404, 'No user found') }

        // return user if get user
        return item;

    } catch (error) {
        // invaliid error from mongoose
        if (error instanceof mongoose.Error) {
          createError(400, "Invalid item Id")
          
        }
        throw error;
    }
}

module.exports = { findWithId }
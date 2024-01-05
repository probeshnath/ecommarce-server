const createError = require('http-errors')
const mongoose  = require('mongoose');

const findWithId = async (Model, id, options) => {
    try {
        // password hide
        // const options = {
        //     password: 0
        // }
        // find
        const item = await Model.findById( id, options)

        // error 
        if (!item) { throw createError(404,  `${Model.modelName} does not found`) }

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
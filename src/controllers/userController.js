const createError = require('http-errors')

// get user 
const getUsers =  (req, res,next) => {
    
    try {
        res.status(200).send({ 
            message: "Users were return",
         })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getUsers
}
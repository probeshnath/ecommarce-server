const createError = require('http-errors')
const User = require('../models/userModel');
const { successResponse } = require('./responseController');
const  mongoose  = require('mongoose');

// get all users
const getUsers = async (req, res, next) => {

    try {
        const search = req.query.search || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

        //  search user by name
        const searchRegExp = new RegExp('.*' + search + '.*', 'i');
        const filter = {
            isAdmin: { $ne: true },
            $or: [
                { name: { $regex: searchRegExp } },
                { email: { $regex: searchRegExp } },
                { phone: { $regex: searchRegExp } },
            ]
        }

        // password hide
        const options = {
            password: 0
        }


        // find all user
        const users = await User.find(filter, options).limit(limit).skip((page - 1) * limit)

        // count document
        const count = await User.find(filter).countDocuments();

        if (!users) {
            throw createError(404, 'No users found')
        }


        // success handler
        return successResponse(res, {
            statusCode: 200,
            message: "Users were return successfully",
            payload: {
                users,
                pagination: {
                    totalPage: Math.ceil(count / limit),
                    currentZPage: page,
                    previousPage: page - 1 > 0 ? page - 1 : null,
                    nextPage: page + 1 >= Math.ceil(count / limit) ? page + 1 : null,
                }
            }
        })
    } catch (error) {
        next(error)
    }
}

// get single user
const getUser = async (req, res, next) => {

    try {
        const id = req.params.id;

        // password hide
        const options = {
            password: 0
        }

        // find
        const user = await User.findById(id, options)

        // error 
        if (!user) { throw createError(404, 'No user found') }

        // success handler
        return successResponse(res, {
            statusCode: 200,
            message: "User are return successfully",
            payload: {
                user
            }
        })
    } catch (error) {
        // invaliid error from mongoose
        if(error instanceof mongoose.Error){
            next(createError(400, "Invalid User Id"))
            return;
        }
        next(error)
    }
}


module.exports = {
    getUsers,
    getUser
}
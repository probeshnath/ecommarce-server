const createError = require('http-errors')
const User = require('../models/userModel');
const { successResponse } = require('./responseController');

// get user 
const getUsers = async (req, res, next) => {

    try {
        const search = req.query.search || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 1;

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

module.exports = {
    getUsers
}
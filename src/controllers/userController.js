const fs = require('fs')
const createError = require('http-errors')
const User = require('../models/userModel');
const { successResponse } = require('./responseController');
const { findWithId } = require('../services/findItem');


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

        // password as a option
        const options = {
            password: 0
        }

        //    call user
        const user = await findWithId(id, options)

        // success handler
        return successResponse(res, {
            statusCode: 200,
            message: "User are return successfully",
            payload: {
                user
            }
        })
    } catch (error) {

        next(error)
    }
}

// delete single user
const deleteUser = async (req, res, next) => {

    try {
        const id = req.params.id;

        // password as a option
        const options = {
            password: 0
        }

        //    call user
        const user = await findWithId(id, options)


        // delete user image
        const userImagePath = user.image
        fs.access(userImagePath, (err) => {
            if (err) {
                console.error("User image does not exist")
            } else {
                fs.unlink(userImagePath, (err) => {
                    if (err) throw err;
                    console.log("user image was deleted")
                })
            }
        })

        // delete user
        await User.findByIdAndDelete({ _id: id, isAdmin: false })

        // success handler
        return successResponse(res, {
            statusCode: 200,
            message: "User are deleted successfully",
        })
    } catch (error) {

        next(error)
    }
}


module.exports = {
    getUsers,
    getUser,
    deleteUser
}
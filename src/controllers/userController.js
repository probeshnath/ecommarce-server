const fs = require('fs').promises
const createError = require('http-errors')
const User = require('../models/userModel');
const { successResponse } = require('./responseController');
const { findWithId } = require('../services/findItem');
const { deleteImage } = require('../helper/deleteImage');
const { createJsonWebToken } = require('../helper/jsonwebtoken');
const { jwtActivationKey,clintURL } = require('../secret');


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
const getUserByID = async (req, res, next) => {

    try {
        const id = req.params.id;

        // password as a option
        const options = {
            password: 0
        }

        //    call user
        const user = await findWithId(User, id, options)

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
const deleteUserByID = async (req, res, next) => {

    try {
        const id = req.params.id;

        // password as a option
        const options = {
            password: 0
        }

        //    call user
        const user = await findWithId(User, id, options)


        // delete user image
        const userImagePath = user.image

        // call the function to delete the user pic
        deleteImage(userImagePath)


        // delete user
        await User.findByIdAndDelete({ _id: id, isAdmin: false })

        // success handler
        return successResponse(res, {
            statusCode: 200,
            message: "User are deleted successfully",
        })
    } catch (error) {
//  passs the error 
        next(error)
    }
}

// process Register user
const processRegister = async (req, res, next) => {

    try {
        // received data from client side
        const {name, email, phone, address, password} = req.body;

        // is exist user with this email, check it
        const userExists = await User.exists({email: email})

        // is exist user with this email, return an error
        if(userExists){
            throw createError(409, "User with this email already exist")
        }

        // create jwt with call function
        const token = createJsonWebToken({name, email, phone, address, password}, jwtActivationKey, '10m')
        console.log(token)

        // prepare email
        const emailData = {
            email,
            subject: 'Account Activation Email',
            html: `
            <h2>Hello ${name}</h2>
            <p>Please click here to <a href="${clintURL}/api/users/activation/${token}" target="_blank" >Activate your account</a></p>
                        
            `
        }


        // send email with nodemailer


        // success handler
        return successResponse(res, {
            statusCode: 200,
            message: "User are created successfully",
            payload: {token}
        })
    } catch (error) {
//  passs the error 
        next(error)
    }
}


module.exports = {
    getUsers,
    getUserByID,
    deleteUserByID,
    processRegister
}
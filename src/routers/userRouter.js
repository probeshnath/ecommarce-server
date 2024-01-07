const express = require('express');
const { getUsers, getUserByID, deleteUserByID } = require('../controllers/userController');
const userRouter = express.Router()


// GET: all users api/users
userRouter.get("/", getUsers )
//  get single user
userRouter.get("/:id", getUserByID )
// delete user
userRouter.delete("/:id", deleteUserByID )


module.exports = userRouter;
const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');
const { default_image } = require('../secret');

const userSchema = new Schema({
    name:{
        type: String,
        required: [true, 'User name is missing'],
        trim: true,
        minlength: [3, 'User name can be minimum 3 chacter'],
        maxlength: [31, 'User name can be maximum 31 chacter'],
    },
    email:{
        type: String,
        required: [true, 'User email is missing'],
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: 'Please enter a valid email'
        },
    },
    password:{
        type: String,
        required: [true, 'User password is missing'],
        minlength: [6, 'User password can be minimum 6 chacter'],
        set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10))
    },
    image:{
        type: String,
        default: default_image
    },
    address:{
        type: String,
        required: [true, 'User address is missing'],
    },
    phone:{
        type: String,
        required: [true, 'User phone is missing'],
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isBanned: {
        type: Boolean,
        default: false
    }
},{
    timestamps:true
}
);

const User = model("Users", userSchema);
module.exports = User;
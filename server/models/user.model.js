const { Schema, model } =  require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    username: {
        type: String,
        lowercase: true,
        required: true,
        trim: true,
        minLength: 5
    },
    name: {
        type: String,
        required: false,
        trim: true
    },
    desc: String,
    password: {
        type: String,
        required: true,
        minLength: 5
    },
    alertEmail: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
})

const User = new model("User", userSchema);

module.exports = User;
const { Schema, model } =  require('mongoose');

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
        unique: true,
        trim: true,
        minLength: 5
    },
    name: {
        type: String,
        required: false,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    }
}, {
    timestamps: true
})

const User = new model("User", userSchema);

module.exports = User;
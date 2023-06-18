const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    phoneNumber: {
        type: String,
        required: true,
        minLength: 9,
        maxLength: 10
    },
    nationalId: {
        type: Number,
        required: true,
        minLength: 16
    }
}, { timestamps: true });

const User = mongoose.model("users", usersSchema);
module.exports = User;
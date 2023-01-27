const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const joi = require('joi')
const passwordComplexity = require('joi-password-complexity')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    likedSongs: {
        type: [String],
        default: []
    },
    playLists: {
        type: [String],
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

userSchema.methods.generateAuthToken = () => {
    const token = jwt.sign(
        { _id: this._id, username: this.username, isAdmin: this.isAdmin },
        process.env.JWTPRIVATEKEY,
        { expiresIn: "7d" }
    )
    return token;
}

const User = mongoose.model('user', userSchema)
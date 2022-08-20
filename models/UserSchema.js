const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        default: ""
    },
    lastName: {
        type: String,
        default: ""
    },
    mobileNo: {
        type: String,
        default: "",
    },
    mobileNoVerification: {
        type: Boolean,
        default: false,
    },
    email: {
        type: String,
        default: ""
    },
    emailVerification: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        default: ""
    }
})

module.exports = mongoose.model('Users', userSchema)
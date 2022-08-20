const mongoose = require('mongoose')

const otpSchema = mongoose.Schema({
    mobileNo: {
        type: Number,
        require: [true, "Please add a name"]
    },
    otp: {
        type: Number,
        require: [true, "Please add a email"],
    },
    expireAt: {
        type: Date,
        default: Date.now,
        index: { expires: '1m' }
    }

})

module.exports = mongoose.model('Otp', otpSchema)
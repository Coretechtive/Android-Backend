const mongoose = require('mongoose')

const BookparkingSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    vechileType: {
        type: String,
        default: ""
    },
    vechileNo: {
        type: String,
        default: ""
    },
    bookingFromDate: {
        type: String,
        default: "",
    },
    bookingFromTime: {
        type: String,
        default: "",
    },
    bookingToDate: {
        type: String,
        default: ""
    },
    bookingToTime: {
        type: String,
        default: ""
    },
    mallName: {
        type: String,
        default: ""
    }
})

module.exports = mongoose.model("BookParking", BookparkingSchema)
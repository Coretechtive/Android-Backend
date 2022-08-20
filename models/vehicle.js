const mongoose = require("mongoose");


const vehileData = new mongoose.Schema({
    //Foreign Key
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    number: {
        type: String,
        required: [true, "Please add vehicle number"]
    },
    wheels: {
        type: String,
        required: [true, "Please mention type of vehicle"]
    },

});

const Data = mongoose.model("Data", vehileData)

module.exports = Data;
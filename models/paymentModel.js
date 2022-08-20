const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
  // contact:{
  //   type:Number,
  //   default:9999999999
  //   // required: true,
  // },
  // email:{
  //   type:String,
  //   default:"random@gmail.com"
  //   //  required: true,
  // },

  // status:{
  //   type:String,
  //   default:"True",
  //   //  required: true,
  // },
  // amount: {
  //   type: Number,
  //   required: true,
  // },
});

module.exports = mongoose.model("Payment", paymentSchema);

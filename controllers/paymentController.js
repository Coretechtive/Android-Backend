// // import { instance } from "../index.js";
// const crypto = require("crypto");
// const Razorpay = require('razorpay');

// const { Payment } = require("../models/paymentModel.js");

// const instance = new Razorpay({
//   key_id: process.env.RAZORPAY_API_KEY,
//   key_secret: process.env.RAZORPAY_API_SECRET,
// });

// const checkout = async (req, res) => {
//   var options = {
//     user: req.user.id,
//     amount: Number(req.body.amount * 100), // amount in the smallest currency unit
//     currency: "INR",
//   };

//   const order = await instance.orders.create(options);

//   console.log(order);

//   res.status(200).json({
//     success: true,
//     order,
//   });
// };

// const paymentVerification = async (req, res) => {
//   const {
//     // amount,
//     // email,
//     // contact,
//     // status,
//     created_at,
//     razorpay_payment_id,
//     razorpay_order_id,
//     razorpay_signature,
//   } = req.body;

//   // const options = {
//   //   amount: 50000, // amount in the smallest currency unit
//   //   currency: "INR",
//   // };
//   // const order = await instance.orders.create(options);

//   // const { email, amount, status, contact } = order;

//   // console.log(amount);
//   // const order = await instance.orders.create(options);
//   // const { amount } = amount;
//   // console.log(amount, razorpay_order_id);

//   const body = razorpay_order_id + "|" + razorpay_payment_id;

//   const expectedSignature = crypto
//     .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
//     .update(body.toString())
//     .digest("hex");

//   const isAuthentic = expectedSignature === razorpay_signature;

//   if (isAuthentic) {
//     await Payment.create({
//       // email,
//       // status,
//       // contact,
//       // amount,
//       created_at,
//       razorpay_payment_id,
//       razorpay_order_id,
//       razorpay_signature,
//     });

//     res.redirect(
//       `http://localhost:3000/paymentsuccess?reference=${razorpay_order_id}`
//     );
//   } else {
//     res.status(200).json({
//       success: true,
//     });
//   }
// };

// module.exports = { checkout, paymentVerification }

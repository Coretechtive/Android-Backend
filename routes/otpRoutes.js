const express = require('express')
const router = express.Router()

const OtpSchema = require('../models/OtpSchema')
const unirest = require("unirest");


router.post('/sendmessage', async (req, res) => {
    const otp = Math.floor((Math.random() * 10000));
    const mobileNo = req.body.mobileNo
    console.log(otp);

    const otpDetails = await OtpSchema.create({
        mobileNo, otp
    })

    console.log(otpDetails);

    const unireq = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");
    unireq.headers({
        "authorization": "cwLvh5WSXKTenoU0VBR723CPIfGyaHNOk8lMbs1QY69DFdizmEo8K7b4jyPxsmtkQWdZEILBNnSMOqU2"
    });
    unireq.form({
        "variables_values": `${otp}. It is valid for 1 min. Please do not share the OTP with anyone`,
        "route": "otp",
        "numbers": `${mobileNo}`,
        // "message": `${otp} is your one time password.It is valid for next 1 min. Please do not share this OTP with anyone. Thank you, CoreTechtive`,
        // "language": "english",
        // "route": "q",
        // "numbers": `${mobileNo}`,
    });
    unireq.end(function (unires) {
        console.log(unires.body);
        res.json(unires.body)
    });

})

router.post('/otpVerifing', async (req, res) => {
    const otp = req.body.otp
    const mobileNo = req.body.mobileNo

    const otpDetails = await OtpSchema.findOne({ mobileNo })

    if (otpDetails.otp == otp) {
        res.json({
            verification: true

        })
    } else {
        res.json({
            verification: false
        })
    }

})

module.exports = router
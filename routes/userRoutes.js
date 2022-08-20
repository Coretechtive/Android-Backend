const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// const uuid = require('uuid')
const authentication = require('../middlewares/userAuthMiddleware')
const dotenv = require('dotenv').config()

const Users = require('../models/UserSchema')

const JWT_SECRET = process.env.JWT_SECRET

router.get('/getuser', authentication, async (req, res) => {

    const user = await Users.findById(req.user.id)
    if (!user) {
        return res.status(401).json({ message: "You are not allowed" })
    }
    res.status(200).json({ user })
})

router.post('/register', async (req, res) => {
    const { firstName, lastName, mobileNo, email, password } = req.body

    if (!email && !mobileNo) {
        return res.status(401).json({ message: "Please fill all Field" })
    }

    const userExistsEmail = await Users.findOne({ email })
    console.log(userExistsEmail);
    const userExistsMobile = await Users.findOne({ mobileNo })
    console.log(userExistsMobile);


    if (userExistsEmail || userExistsMobile) {
        return res.status(401).json({ message: "User already exist" })
    }

    // Genarate Salt
    // let user;
    // if (!password) {
    //     user = await Users.create({
    //         firstName: firstName,
    //         lastName: lastName,
    //         mobileNo: mobileNo,
    //         email: email,
    //         password: password,
    //     })
    // } else {
    const salt = await bcrypt.genSalt(10)

    // Hashing Password
    const hashedPassword = await bcrypt.hash(password, salt)

    // Creating user
    const user = await Users.create({
        firstName: firstName,
        lastName: lastName,
        mobileNo: mobileNo,
        email: email,
        password: hashedPassword,
    })
    // }

    if (user) {
        res.status(200).json({
            user,
            token: genarateToken(user.id)
        })
    } else {
        res.status(401).json({ message: "Some error occurs" })
    }
})

router.post('/registerAndLoginWithOtp', async (req, res) => {
    const mobileNo = req.body.mobileNo

    if (!mobileNo) {
        return res.status(401).json({ message: "Please fill all Field" })
    }
    const userExistsMobile = await Users.findOne({ mobileNo })
    console.log(userExistsMobile);

    // Check if User Exist or Not
    if (userExistsMobile) {
        // return res.status(401).json({ message: "User already exist" })
        res.status(200).json({
            message: "User already exist",
            userExistsMobile,
            token: genarateToken(userExistsMobile.id)
        })
    } else {

        // Creating User
        const user = await Users.create({
            mobileNo: mobileNo,
        })

        if (user) {
            res.status(200).json({
                user,
                token: genarateToken(user.id)
            })
        } else {
            res.status(401).json({ message: "Some error occurs" })
        }
    }
})

router.post('/login', async (req, res) => {
    const { mobileNo, password } = req.body

    if (!mobileNo || !password) {
        return res.status(400).json({ message: "Please Enter all fields" })
    }

    const user = await Users.findOne({ mobileNo })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            user,
            token: genarateToken(user.id)
        })
    }
    else {
        res.status(401).json({ message: "Invalid Credential" })
    }
})

// router.post('/loginWithOtp', async (req, res) => {
//     const mobileNo = req.body.mobileNo

//     if (!mobileNo) {
//         return res.status(400).json({ message: "Please Enter all fields" })
//     }

//     const user = await Users.findOne({ mobileNo })

//     if (user) {
//         res.status(200).json({
//             user,
//             token: genarateToken(user.id)
//         })
//     }
//     else {
//         res.status(401).json({ message: "Invalid Credential" })
//     }
// })

router.put('/update', authentication, async (req, res) => {

    const user = await Users.findById(req.user.id)

    if (!user) {
        res.status(400).json({ message: "User not found" })
    }

    const updatedUser = await Users.findByIdAndUpdate(req.user.id, req.body)
    res.json(updatedUser)

})
const genarateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET)
}

module.exports = router
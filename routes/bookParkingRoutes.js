const express = require('express')
const router = express.Router()
const BookParkingSchema = require('../models/BookParkingSchema')
const authentication = require('../middlewares/userAuthMiddleware')

router.get('/myBookings', authentication, async (req, res) => {
    const myBookings = await BookParkingSchema.find({ user: req.user.id })

    if (myBookings) {
        res.status(200).json({ myBookings })
    } else {
        res.status(401).json({ message: "Something Went Wrong" })
    }
})

router.post('/booking', authentication, async (req, res) => {
    const { vechileType, vechileNo, bookingFromDate, bookingFromTime, bookingToDate, bookingToTime, mallName } = req.body

    if (!vechileType || !vechileNo || !bookingFromDate || !bookingFromTime || !bookingToDate || !bookingToTime || !mallName) {
        res.status(401).json({ message: "Fill All The Fields" })
    }
    const myBooking = await BookParkingSchema.create({
        user: req.user.id,
        vechileType,
        vechileNo,
        bookingFromDate,
        bookingFromTime,
        bookingToDate,
        bookingToTime,
        mallName
    })

    if (myBooking) {
        res.status(200).json({ myBooking })
    } else {
        res.status(401).json({ message: "Some Error Occurs" })
    }
})

module.exports = router
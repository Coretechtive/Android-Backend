const express = require("express");
const authentication = require("../middlewares/userAuthMiddleware");
const router = express.Router();


const Data = require("../models/vehicle");



router.post("/register", authentication, async (req, res) => {
    const { number, wheels } = req.body;

    if (!number || !wheels) {
        return res.status(422).json({ error: "Please fill all details" })
    }

    const num = await Data.findOne({ number: req.body.number });
    if (num) {
        return res.status(400).json({ error: "Sorry Vehicle number already registered" })
    }
    try {
        const vehicle = await Data.create({
            user: req.user.id,
            number, wheels
        });
        res.status(200).json({ vehicle })
    } catch (error) {
        res.status(404).send("Error")
    }
});

router.get('/regis', authentication, async (req, res) => {
    try {
        const info = await Data.find({ user: req.user.id });
        res.json({ info })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");

    }

})

module.exports = router;
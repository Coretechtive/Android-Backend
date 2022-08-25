const express = require('express')
const fast2sms = require('fast-two-sms')
const bodyparser = require('body-parser')
const OtpSchema = require('./models/OtpSchema');
const connectToMongo = require('./config/database');
var cors = require('cors')

connectToMongo()

const app = express();
const { PORT } = process.env;

app.use(cors())
app.use(express.json())

app.use(bodyparser.urlencoded({ extended: false }))

app.use(bodyparser.json())

app.listen(PORT, () => { console.log(`Server start on port ${PORT}`) })


app.use('/api/otp', require('./routes/otpRoutes'))
app.use('/api/googlelogin', require('./routes/googleRoutes'))
app.use('/api/facebooklogin', require('./routes/facebookRoutes'))
app.use('/api/user', require('./routes/userRoutes'))
app.use('/api/addVehicle', require("./routes/data"))
app.use('/api/bookParking', require('./routes/bookParkingRoutes'))
app.use("/api", require('./routes/paymentRoutes'));


app.get('/', (req, res) => {
    res.json({message: "Application Hosted"})
})

// app.post('/sendmessage', async (req, res) => {
//     const otp = Math.floor((Math.random() * 10000));
//     const mobileNo = req.body.number
//     console.log(otp);

//     const otpDetails = await OtpSchema.create({
//         mobileNo, otp
//     })

//     // sessionStorage.setItem({ no: mobileNo })

//     console.log(otpDetails);


//     const unirest = require("unirest");
//     const unireq = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");
//     unireq.headers({
//         "authorization": "cwLvh5WSXKTenoU0VBR723CPIfGyaHNOk8lMbs1QY69DFdizmEo8K7b4jyPxsmtkQWdZEILBNnSMOqU2"
//     });
//     unireq.form({
//         "variables_values": `${otp}`,
//         "route": "otp",
//         "numbers": `${req.body.number}`,
//     });
//     unireq.end(function (unires) {
//         console.log(unires.body);
//         // res.json(unires.body)
//     });

// })

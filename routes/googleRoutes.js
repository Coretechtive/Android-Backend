const express = require('express')
const googlerouter = express.Router();
const {googleLogin} = require('../controllers/googleController')

googlerouter.post('/',googleLogin);


module.exports = googlerouter
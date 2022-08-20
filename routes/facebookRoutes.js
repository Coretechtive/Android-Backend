const express = require('express')
const facebookrouter = express.Router();
const {facebookLogin} = require('../controllers/facebookController')

facebookrouter.post('/',facebookLogin);


module.exports = facebookrouter
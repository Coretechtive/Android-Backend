
const User = require('../models/UserSchema')
const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client("489582763174-i1epcbf4fb4b1mb52agdel1760srv2ri.apps.googleusercontent.com")
const googleLogin = async(req, res)=>{
    console.log(req.body)
    const {tokenId} = req.body;
    client.verifyIdToken({idToken: tokenId, audience: "489582763174-i1epcbf4fb4b1mb52agdel1760srv2ri.apps.googleusercontent.com"}).then(response =>{
        const {email_verified, name, email, given_name, family_name} = response.payload
        if(email_verified){
            User.findOne({email}).exec((err, user)=>{
                if(err){
                    return res.status(400).json({
                        error: "Something went wrong..."
                    })
                }
                else{
                    if(user){
                        const {_id, firstName, email} = user;
                        res.json({
                            user: {_id, firstName, email}
                        })
                    }
                    else{
                        let newUser = new User({
                            firstName: given_name,
                            lastName: family_name,
                            email: email,
                            verifyEmail: true
                        })

                        newUser.save((err, data) =>{
                            if(err){
                                return res.status(400).json({
                                    error: "Something went wrong..."
                                })
                            }

                            const {_id,firstName, lastName, email} = newUser

                            res.json({
                                user: {_id,firstName, lastName, email}
                            })

                        })
                    }
                }
            })
        }
        else{
            res.status(400).json({
                message: "Invalid token"
            })
        }
    })
} 


module.exports = {
    googleLogin
}
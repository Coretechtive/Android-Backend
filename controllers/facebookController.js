const User = require('../models/UserSchema')


const facebookLogin = async(req, res) =>{
    console.log(req.body)
    const {userId,email,name} = req.body

        User.findOne({email : email}).exec((err, user)=>{
            

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
                        firstName: name,
                        
                        email: email,
                        verifyEmail: true
                    })

                    newUser.save((err, data) =>{
                        if(err){
                            return res.status(400).json({
                                error: "Something went wrong..."
                            })
                        }

                        const {_id,firstName, email} = newUser

                        res.json({
                            user: {_id,firstName, email}
                        })

                    })
                }
            }

        })



}



// const fetch = require('node-fetch')

// const facebookLogin = async(req, res) =>{
//     const {userID, accessToken} = req.body

//     let urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`

//     fetch(urlGraphFacebook, {
//         method: 'GET'
//     })
//     .then(response => response.json()) 
//     .then(response =>{ 
//         const {email,name} = response

//         User.findOne({email}).exec((err, user)=>{
//             if(err){
//                 return res.status(400).json({
//                     error: "Something went wrong..."
//                 })
//             }

//             else{
//                 if(user){
//                     const {_id, firstName, email} = user;
//                     res.json({
//                         user: {_id, firstName, email}
//                     })
//                 }
//                 else{
//                     let newUser = new User({
//                         firstName: name,
                        
//                         email: email,
//                         verifyEmail: true
//                     })

//                     newUser.save((err, data) =>{
//                         if(err){
//                             return res.status(400).json({
//                                 error: "Something went wrong..."
//                             })
//                         }

//                         const {_id,firstName, email} = data

//                         res.json({
//                             user: {_id,firstName, email}
//                         })

//                     })
//                 }
//             }

//         })

//     })
// }

module.exports = {
    facebookLogin
}
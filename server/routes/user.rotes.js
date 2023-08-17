const { Router } = require('express')
const { userModel } = require('../model/UserModel')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { authentication } = require('../middleware/authentication')

const userController = Router()

// signup api
userController.post('/signup', (req, res) => {
    const { username, email, mobile, password } = req.body
    bcryptjs.hash(password, 5, async function(err, hash) {
        if(err) {
            console.log("something wrong")
        }

        const user = new userModel({
            username, 
            email,
            mobile,  
            password: hash 
        })  
        try {    
            await user.save()
            res.status(200).send({ msg: "data send", user})
        } catch (error) {
            res.status(404).send({ msg:"data not send succssfully", error })
        }
    })
})

// login api
userController.post('/login', authentication, async (req, res) => {
    const { email, password} = req.body
    const user = await userModel.findOne({ email })
    const hashpassword = user.password
    bcryptjs.compare(password, hashpassword, async function (err, result) {
        if(err) {
            console.log(err)
        }
        if(result) {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SCRET)
            res.status(200).send({ msg: "login successful", token })
        } else {
            res.status(404).send({ msg: "not login"})
        }
    })
})


module.exports = { userController }
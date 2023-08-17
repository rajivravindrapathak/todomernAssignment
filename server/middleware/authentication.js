const jwt  = require("jsonwebtoken")
require("dotenv").config()


const authentication = (req, res, next) => {
    if(!!req.headers.authorization) {
        return res.send({ msg: "please login again"})
    }
    const token = req.headers.quthorization.split(" ")[1] 

    Jwt.verify(token, process.env.JWT_SCRET, function(err, decoded) {
        if(err) {
            res.send({ msg: "plase login first"})
        }
        else {
            req.body.userId = decoded.userId
            next()
        }
    })
}

module.exports = { authentication }
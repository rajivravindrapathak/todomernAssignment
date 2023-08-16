const jwt  = require("jsonwebtoken")
require("dotenv").config()


const authentication = (req, res, next) => {
    if(!req) {
        return res.send({ msg: ""})
    }
    const token = req.headers.quthorization.split(" ")[1] 

    Jwt.verify(token, process.env.JWT_SCRET, function(err, decoded) {
        if(err) {
            res.send({ msg: "plase login again"})
        }
        else {
            req.body.userId = decoded.userId
            next()
        }
    })
}

module.exports = { authentication }
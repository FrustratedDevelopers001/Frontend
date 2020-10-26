const jwt = require("jsonwebtoken");
const admin = require("../models/adminModel");
const jwtKey = process.env.TEXT;

const auth = async (req, res, next) => {
try {
    const token = req.query.token
    const decode = jwt.decode(token,jwtKey)
    const Admin = await admin.findOne({email : decode.email,'tokens.token':token})

    if(!Admin) {
        throw new Error()
    } 
    next()
   
} catch (error) {
    res.render("admin",{
        message : "Please Login First"
    })
}
}
module.exports = auth;
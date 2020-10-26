const jwt = require("jsonwebtoken");
const User = require("../models/adminModel");
const jwtKey = process.env.TEXT;

const auth = async (req, res, next) => {
    console.log("in auth")
    next()
//   try {
//     let token;
//     if (req.query.token !== undefined) {
//       token = req.query.token;
//     } else if (req.body.token !== undefined) {
//       token = req.body.token;
//     } else {
//       token = req.header("Authorization").replace("Bearer ", "");
//     }
//     const decoded = jwt.verify(token, jwtKey);
//     const user = await User.findOne({ email: decoded.email, "tokens.token": token });
//     console.log(user)
//     if (!user) throw new Error("User does not exists");
//     req.token = token;
//     req.user = user;
//     next();
//   } catch (e) {
//     res.send(e)
//   }
};

module.exports = auth;
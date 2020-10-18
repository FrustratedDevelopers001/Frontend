require("dotenv").config()
const express = require("express")
const router = new express.Router()
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Admin = require("../models/adminModel")
router.get("/adminReg", (req, res) => {
    res.render("adminReg")
})
router.post("/adminReg", (req, res) => {
    bcrypt.hash(process.env.TEXT, saltRounds, function(err, hash) {
        const name = req.body.name
        const email = req.body.email
        const secretCode = req.body.secretCode
        const password = req.body.password
        const cpassword = req.body.cpassword
        if (!email || !secretCode || !password || !password || !name) {
            res.send("Missing Data")
        } else {
            if (secretCode == process.env.SECRET) {
                if (password == cpassword) {
                    const admin = new Admin({
                        name: name,
                        email: email,
                        password: hash
                    })
                    admin.save().then(() => {
                        res.redirect("/admin")
                    })
                } else {
                    res.render("adminReg", {
                        message: "Password do not match"
                    })
                }
            } else {
                res.render("adminReg", {
                    message: "Invalid Secret Code"
                })
            }
        }
    });


})
module.exports = router
require("dotenv").config()
const express = require("express")
const router = new express.Router()
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Admin = require("../models/adminModel")
router.get("/adminReg", (req, res) => {
    res.render("adminReg", {
        message: ""
    })
})
router.post("/adminReg", async(req, res) => {
    const name = req.body.name
    const email = req.body.email
    const secretCode = req.body.secretCode
    const password = req.body.password
    const cpassword = req.body.cpassword
    if (!email || !secretCode || !password || !password || !name) {
        res.send("Missing Data")
    } else {
        if (secretCode == process.env.SECRET) {
            if (password === cpassword) {
                const admin = new Admin({
                    name: name,
                    email: email,
                    password: password
                })
                try {
                    await admin.save()
                    res.render("adminPanel", {
                        name: name
                    })

                } catch (error) {
                    res.send("Error")
                }

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



})
module.exports = router
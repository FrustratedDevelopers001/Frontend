require("dotenv").config()
const express = require("express")
const router = new express.Router()

const Admin = require("../models/adminModel")
router.get("/adminReg", (req, res) => {
        res.render("adminReg", {
            message: ""
        })
    })
    // Error handled
router.post("/adminReg", async(req, res) => {
    const name = req.body.name
    const email = req.body.email
    const secretCode = req.body.secretCode
    const password = req.body.password
    const cpassword = req.body.cpassword

    if (secretCode == process.env.SECRET) {
        if (password === cpassword) {
            const admin = new Admin({
                name: name,
                email: email,
                password: password
            })
            try {
                await admin.save()
                res.redirect("admin/adminPanel")

            } catch (error) {
                console.log(error)
                res.render("adminReg", {
                    message: "Account already Exist"
                })
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




})
module.exports = router
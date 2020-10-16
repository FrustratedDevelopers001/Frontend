const express = require("express")
const bcrypt = require("bcrypt")
const router = new express.Router()
const Admin = require("../models/adminModel")
router.get("/admin", (req, res) => {
    res.render("admin")
})
router.post("/admin", (req, res) => {
    const adminID = req.body.adminId
    const password = req.body.password

    // console.log(password)
    if (!adminID || !password) {
        res.render("admin", {
            message: "*Missing parameters"
        })
    }
    Admin.findOne({ email: adminID }, (err, foundAdmin) => {
        if (!foundAdmin) {
            res.render("admin", {
                message: "User not found"
            })
        } else {
            bcrypt.hash(password, foundAdmin.password, function(err, result) {
                if (result) res.send("HLogin")
                else res.render("admin", {
                    module: "Invalid Password"
                })
            });
        }
    })
})

module.exports = router
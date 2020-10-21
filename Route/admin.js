require("dotenv").config()
const express = require("express")
const bcrypt = require("bcrypt")
const router = new express.Router()
const Notice = require("../models/noticeModel")
const Admin = require("../models/adminModel")
var nametobeSent = ""
const getName = (name) => {
    nametobeSent = name
}
router.get("/admin", (req, res) => {
    res.render("admin", {
        message: ""
    })
})

router.post("/admin", async(req, res) => {
    const adminID = req.body.adminId
    const password = req.body.password


    if (!adminID || !password) {
        res.render("admin", {
            message: "*Missing parameters"
        })
    }
    try {
        const adminData = await Admin.findByCredentials(adminID, password)
        getName(adminData.name)
        res.redirect("admin/adminPanel")

    } catch (error) {
        res.render("admin", {
            message: error
        })
    }

})
router.get("/admin/adminPanel", async(req, res) => {
    res.render("adminPanel", {
        name: nametobeSent
    })
})
router.get("/admin/faculty/add", async(req, res) => {
    res.send("faculty add hogi ab")
})
router.get("/admin/student/add", async(req, res) => {
    res.send("ab students add honge")
})

module.exports = router
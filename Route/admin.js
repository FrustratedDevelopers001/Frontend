require("dotenv").config()
const express = require("express")
const bcrypt = require("bcrypt")
const router = new express.Router()
const Notice = require("../models/noticeModel")
const Admin = require("../models/adminModel")
router.get("/admin", (req, res) => {
    res.render("admin", {
        message: ""
    })
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
    const findUser = async(id) => {
        const admin = await Admin.findOne({ email: id })
        return admin
    }
    findUser(adminID).then((adminData) => {
        res.render("adminPanel", {
            name: adminData.name
        })
    }).catch((e) => {
        console.log(e)
    })

})
router.post("/admin/faculty/add", (req, res) => {
    res.send("Will add faculty")
})
router.post("/admin/faculty/update", (req, res) => {
    res.send("Will update faculty")
})
router.post("/admin/faculty/attendance", (req, res) => {
    res.send("Will remove faculty")
})
router.post("/admin/student/add", (req, res) => {
    res.send("Will add student")
})
router.post("/admin/student/update", (req, res) => {
    res.send("Will update studnet")
})
router.post("/admin/student/attendance", (req, res) => {
    res.send("Attendance")
})


module.exports = router
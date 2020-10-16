const express = require("express")
const router = new express.Router()
const Admin = require("../models/adminModel")
router.get("/admin", (req, res) => {
    res.render("admin")
})
router.post("/admin", (req, res) => {
    const adminID = req.body.adminId
    const password = req.body.password
    console.log(adminID)
        // console.log(password)
    if (!adminID || !password) {
        res.render("admin", {
            message: "*Missing parameters"
        })
    } else {
        const admin = Admin.findOne({ email: adminID }, (err, op) => {
            if (password == op.password) {
                if (op) {
                    res.send(`user found`)

                } else {
                    res.render("admin", {
                        message: "Invalid user "
                    })
                }
            } else {
                res.render("admin", {
                    message: "Invalid Password"
                })
            }
        })

    }

})

module.exports = router
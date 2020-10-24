const express = require("express")
const router = new express.Router()
router.get("/student/forgotpassword", (req, res) => {
    res.render("resetPassword")
})
router.post("/", (req, res) => {
    res.send("Ha bhai")
})

module.exports = router
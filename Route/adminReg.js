require("dotenv").config()
const express = require("express")
const router = new express.Router()

router.get("/adminReg", (req, res) => {
    res.render("adminReg")
})
router.post("/adminReg", (req, res) => {
    res.send("Recived")
})
module.exports = router
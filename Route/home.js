const express = require("express")
const router = new express.Router()
router.get("/", (req, res) => {
    res.render("index")
})
router.post("/", (req, res) => {
    res.send("Ha bhai")
})

module.exports = router
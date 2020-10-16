const express = require("express")
const router = new express.Router()

router.get("/admin", (req, res) => {
    res.render("admin")
})

module.exports = router
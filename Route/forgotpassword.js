const express = require("express")
const router = new express.Router()

router.get("/forgotpassword", (req, res) => {
    res.render("forgotpassword")
})



module.exports = router
const express = require("express")

const router = new express.Router()
const Notice = require("../models/noticeModel")
router.get("/addNotice", (req, res) => {
    res.render("addNotice")
})
router.get("/notice", (req, res) => {
    Notice.find((err, data) => {
        if (data.length == 0) {
            res.render("noticePage", {
                title: "No notice to show",
                notice: data
            })
        } else {
            res.render("noticePage", {
                title: "Notice",
                notice: data
            })
        }
    })

})
router.post("/addNotice", (req, res) => {
    const title = req.body.title
    const notice = req.body.notice
    if (!title || !notice) {
        res.render("addNotice", {
            message: "*Missing Parameters"
        })
    } else {
        const noticeData = new Notice({
            title: title,
            body: notice
        })
        noticeData.save().then(() => {
            res.render("adminPanel", {
                name: ""
            })
        }).catch()

    }

})
router.get("/updateNotice", (req, res) => {
    res.send("Will update studnet")
})
router.get("/remove", (req, res) => {
    res.send("Attendance")
})

module.exports = router
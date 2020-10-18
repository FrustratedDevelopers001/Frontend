const expres = require("express")
const router = new expres.Router()
const noticeData = require("../models/noticeModel")

router.get("/notice/:noticeName", (req, res) => {
    const par = req.params.noticeName.toLowerCase();
    noticeData.findOne({ "title": req.params.noticeName }, (err, data) => {
        var title = data.title.toLowerCase();
        if (title === par) res.render("post", data);

    })


})

module.exports = router
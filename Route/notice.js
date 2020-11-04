const expres = require("express")
const router = new expres.Router()
const noticeData = require("../models/noticeModel")

router.get("/notice/:noticeName", async(req, res) => {
  // console.log(req.params.noticeName)
  const par = req.params.noticeName.toLowerCase();
  try {
    const data = await noticeData.findOne({ title: req.params.noticeName });

    var title = data.title.toLowerCase();
    if (title === par) res.render('post', data);
  } catch (error) {
    res.send(error);
  }
})

module.exports = router
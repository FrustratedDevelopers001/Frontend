const mongoose = require("mongoose")

const noticeChema = new mongoose.Schema({
    title: String,
    body: String
})

const Notice = new mongoose.model("Notice", noticeChema)

module.exports = Notice;
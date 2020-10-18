require('dotenv').config()
const path = require('path')
const express = require("express")
const hbs = require('hbs')
const ejs = require("ejs")
const app = express();
const bodyParser = require("body-parser")
const homeRoute = require("./Route/home")
const adminRoute = require("./Route/admin")
const forgotpassword = require("./Route/forgotpassword")
const adminReg = require("./Route/adminReg")
const notice = require("./Route/noticeRoute")
const notices = require("./Route/notice")
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(express.static("Public"))
app.use(bodyParser.urlencoded({
    extended: true
}))


app.use(homeRoute)
app.use(adminRoute)
app.use(forgotpassword)
app.use(adminReg)
app.use(notice)
app.use(notices)
require("./models/mongo")

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
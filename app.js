require('dotenv').config()
const express = require("express")
const ejs = require("ejs")
const app = express();
const bodyParser = require("body-parser")
const homeRoute = require("./Route/home")
const adminRoute = require("./Route/admin")
const forgotpassword = require("./Route/forgotpassword")

const notice = require("./Route/noticeRoute")
const notices = require("./Route/notice");
const underMaintainence = false;
const studentRoute = require("./Route/student")
const port = process.env.PORT || 3000
app.set('view engine', 'ejs')

app.use(express.static(`Public`))

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use((req,res,next)=>{
    if(underMaintainence) res.send("Under Maintainence, come back later")
    else next();
})

app.use(homeRoute)
app.use(adminRoute)
app.use(forgotpassword)

app.use(notice)
app.use(studentRoute)
app.use(notices)
require("./models/mongo")

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
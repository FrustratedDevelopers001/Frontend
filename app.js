require('dotenv').config()
const path = require('path')
const express = require("express")
const hbs = require('hbs')
const app = express();
const bodyParser = require("body-parser")
const homeRoute = require("./Route/home")
const adminRoute = require("./Route/admin")
const forgotpassword = require("./Route/forgotpassword")
const adminReg = require("./Route/adminReg")

const port = process.env.PORT || 3000
app.set('view engine', 'hbs')
app.use(express.static("Public"))
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(homeRoute)
app.use(adminRoute)
app.use(forgotpassword)
app.use(adminReg)
app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
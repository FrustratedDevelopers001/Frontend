require("dotenv").config()
const mongoose = require("mongoose")
const key = process.env.KEY

mongoose.connect(`mongodb+srv://admin_ripu:${key}@cluster1.y3gpy.mongodb.net/Icfai?retryWrites=true&w=majority`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const adminSchema = new mongoose.Schema({
    email: String,
    password: String,

})

const Admin = new mongoose.model("Admin", adminSchema)

module.exports = Admin;
require("dotenv").config()
const mongoose = require("mongoose")
const key = process.env.KEY
const chalk = require("chalk")
mongoose.connect(`mongodb+srv://admin_ripu:${key}@cluster1.y3gpy.mongodb.net/Icfai?retryWrites=true&w=majority`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log(chalk.greenBright.bold("Connected to Database Suceesfully !!!"))
})
require("dotenv").config();
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validator(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email")
            }
        }
    },
    password: {
        type: String,
        required: true,

    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    tokens : [{
        token :{
            type : String,
            required : true
        }
    }]

})

adminSchema.methods.generateAuthToken = async function(){
     const admin = this
     const token =  jwt.sign({email : admin.email},process.env.TEXT,{ expiresIn: "1h" })
     admin.tokens = admin.tokens.concat({token})
     await admin.save()
     return token;

}

adminSchema.statics.findByCredentials = async(email, password) => {
    const admin = await Admin.findOne({ email })
    if (!admin) throw new Error("User doesn't exists")

    const match = await bcrypt.compare(password, admin.password)

    if (!match) throw new Error("Invlaid Password")

    return admin

}


adminSchema.pre("save", async function(next) {
    const admin = this
    if (admin.isModified("password")) {
        admin.password = await bcrypt.hash(admin.password, 8)
    }
    next()
})

const Admin = new mongoose.model("Admin", adminSchema)

module.exports = Admin;
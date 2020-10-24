require("dotenv").config()
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const validator = require("validator")
const Admin = require("./adminModel")
const passport = require("passport")

const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        lowercase: true
    },
    lastName: {
        type: String,
        trim: true,
        lowercase: true
    },
    enrollment: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true
    },
    fatherName: {
        type: String,
        trim: true,
        lowercase: true
    },
    academicSession: {
        type: String,

    },
    password: {
        type: String,

    },
    studentContact: {
        type: Number,

    },
    studentEmail: {
        type: String,
        lowercase: true

    },
    department: {
        type: String,
        lowercase: true,
    },
    subjects: [{
            subject: String,
            section: String
        }

    ],
})

studentSchema.static.findByCredentials = async(enrollment, password) => {
    const student = await Student.findOne({ enrollment })
    if (!Admin) throw new Error("Student doesn't exist")

    const match = await bcrypt.compare(password, student.password)

    if (!match) throw new Error("Invalid Password");

    return student
}

studentSchema.pre("save", async function(next) {
    const student = this
    if (student.isModified("password")) {
        student.password = await bcrypt.hash(student.password, 8)
    }

    next()
})

const Student = new mongoose.model("Student", studentSchema)

module.exports = Student;
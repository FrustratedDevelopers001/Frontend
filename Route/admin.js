require("dotenv").config()
const express = require("express")
const nodeMailer = require("nodemailer")
const router = new express.Router()
const Notice = require("../models/noticeModel")
const Admin = require("../models/adminModel")
const Student = require("../models/studentModel")
const auth = require("../middleware/auth")
const { get } = require("mongoose")

var activeId = ""
var activePassword = ""
var activeName = ""
const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASSWORD
    }
});


router.get("/admin", (req, res) => {
    res.render("admin", {
        message: ""
    })
})
router.get("/admin/signUp",async (req,res)=>{
    res.render("adminReg", {
        message: ""
    })
})
router.post("/admin/signUp", async(req,res)=>{
    const name = req.body.name
    const email = req.body.email
    const secretCode = req.body.secretCode
    const password = req.body.password
    const cpassword = req.body.cpassword
    activeName = name
    activeId = email,
    activePassword = password
    if (secretCode == process.env.SECRET) {
        if (password === cpassword) {
            const admin = new Admin({
                name: name,
                email: email,
                password: password
            })
            try {
                await admin.save()
                const token = await admin.generateAuthToken()        
                res.redirect('/admin/adminPanel/?token='+token)

            } catch (error) {
                console.log(error)
                res.render("adminReg", {
                    message: "Account already Exist"
                })
            }

        } else {
            res.render("adminReg", {
                message: "Password do not match"
            })
        }
    } else {
        res.render("adminReg", {
            message: "Invalid Secret Code"
        })
    }


})
router.post("/admin" ,async(req, res) => {
 
    const adminID = req.body.adminId
    const password = req.body.password
    activeId = adminID,
    activePassword = password
    const admin = await Admin.findByCredentials(adminID,password)
    activeName = admin.name
    const token = await admin.generateAuthToken()
    
    if (!adminID || !password) {
        res.render("admin", {
            message: "*Missing parameters"
        })
    }
    try {
        
        
        res.redirect("/admin/adminPanel/?token="+token);

    } catch (error) {
        res.render("admin",{
            message : error
        })
    }

})
router.get("/admin/adminPanel",auth ,async(req, res) => {
   
    res.render(`adminPanel`, {
        name: activeName
        
    })
})
router.get("/admin/faculty/add", async(req, res) => {
    console.log(checkData.email)
    res.send("faculty add hogi ab")
})
router.get("/admin/student/add", async(req, res) => {
    res.render("AddStudent", {
        message: ""
    })
})

router.post("/admin/student/add", async(req, res) => {
    
    const student = new Student({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        enrollment: req.body.enrollment,
        fatherName: req.body.fatherName,
        academicSession: req.body.academicSession,
        password: req.body.password,
        studentContact: req.body.studentContact,
        studentEmail: req.body.studentEmail,
        department: req.body.department,
        subjects: [{
                subject: req.body.sb1,
                section: req.body.sc1
            },
            {
                subject: req.body.sb2,
                section: req.body.sc2
            },
            {
                subject: req.body.sb3,
                section: req.body.sc3
            },
            {
                subject: req.body.sb4,
                section: req.body.sc4
            },
            {
                subject: req.body.sb5,
                section: req.body.sc5
            },
            {
                subject: req.body.sb6,
                section: req.body.sc6
            },


        ]


    })
    
    try {
        const admin = await Admin.findByCredentials(activeId,activePassword)
        const token = await admin.generateAuthToken()
        await student.save()        
        res.redirect("/admin/adminPanel/?token="+token);
    } catch (error) {
        console.log(error)
        
    }
    try {
        const info = await transporter.sendMail({
            from: process.env.MAIL_ID,
            to: student.studentEmail,
            subject: `${student.department} deparartment registration`,

            html: `<body>
            <h2>Your registration for ${student.academicSession} is sucssfull</h1>
            <div>
            
                <h3>Following are the list of subject and sections alloted to ${student.firstName.toUpperCase(  )} ${student.lastName.toUpperCase()} bearing enrollment number ${student.enrollment} </h3>
                <tr>
                    <th style="margin-left: 1em; !important">subject</th>
                    <th style="margin-left: 1em; !important">Section</th>
                    <th style="margin-left: 1em; !important">Faculty</th>
                </tr>
                <tr>
                    <td>${student.subjects[0].subject}</td>
                    <td style="margin-left: 1em;"> ${student.subjects[0].section}</td>
                </tr>
                <tr>
                    <td>${student.subjects[1].subject}</td>
                    <td style="margin-left: 1em;"> ${student.subjects[1].section}</td>
                </tr>
                <tr>
                    <td>${student.subjects[2].subject}</td>
                    <td style="margin-left: 1em;"> ${student.subjects[2].section}</td>
                </tr>
                <tr>
                    <td>${student.subjects[3].subject}</td>
                    <td style="margin-left: 1em;"> ${student.subjects[3].section}</td>
                </tr>
                <tr>
                    <td>${student.subjects[4].subject}</td>
                    <td style="margin-left: 1em;"> ${student.subjects[4].section}</td>
                </tr>
                <tr>
                    <td>${student.subjects[5].subject}</td>
                    <td style="margin-left: 1em;"> ${student.subjects[5].section}</td>
                </tr>
                
            </div>
        </body>`

        })


    } catch (error) {
        console.log(error)
    }


})
router.post('/admin/student/allStudent', async (req, res) => {
  try {
    const studentData = await Student.find({})
    res.send(studentData)
  } catch (error) {
      res.status(400).send(error)
  }

});
module.exports = router
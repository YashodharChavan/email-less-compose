import express from "express"
import nodemailer from "nodemailer"
import bodyParser from "body-parser"
import cors from "cors"
const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.post("/send", (req, res) => {
    const {to, subject, text} = req.body
    console.log(to, subject, text)
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "example@gmail.com", // enter your email here
            pass: "your-app-key"    // enter your app password here, you can get it from your google account
        }
    })

    const mailOptions = {
        from: 'example@gmail.com', // your email goes here 
        to,
        subject,
        text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.json({
                message: "Error in sending email"
            })
        } else {
            res.json({
                message: "Email sent successfully"
            })
        }
    });
})

app.listen(3000, () => {
    console.log("Server started on http://localhost:3000")
})
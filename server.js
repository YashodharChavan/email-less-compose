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
            user: "yashodhar.vgency@gmail.com",
            pass: "nohewkqvblqfxdlc"
        }
    })

    const mailOptions = {
        from: 'yashodhar.vgency@gmail.com', 
        to,
        subject,
        text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.json({
                message: "Error sending email"
            })
        } else {
            res.json({
                message: "Email sent successfully"
            })

        }
    });
})

app.listen(3000, () => {
    console.log("Server started on port 3000")
})
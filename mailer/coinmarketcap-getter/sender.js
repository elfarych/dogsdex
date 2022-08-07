const html = require('./mail-text-html')
const nodemailer = require("nodemailer");
const axios = require('axios')


let testEmailAccount = nodemailer.createTestAccount()

let transporter = nodemailer.createTransport({
    host: 'connect.smtp.bz',
    port: 465,
    secure: true,
    auth: {
        user: 'devspace88@gmail.com',
        pass: 'NRm9uag5wAYe',
    },
})

function sendMail(toObject) {
    try {
        transporter.sendMail({
            from: '"Dogs DAO" <promo@dexdogs.site>',
            to: toObject.email,
            subject: 'DogsDEX free airdrop | 3500 DOGS token',
            html
        }).then(res => {
            if (toObject.id) {
                try {
                    axios.patch(`http://192.168.0.109:8000/update/${toObject.id}/`, {
                        sent: true
                    })
                } catch (e) {
                    console.log(e.message)
                }
            }
        })
    } catch (e) {
        console.log(e)
    }
}

async function loadEmails() {
    try {
        await axios.get('http://192.168.0.109:8000/valid_list/').then(res => {
            console.log(res.data.results.length)
            const data = res.data.results.slice(0, 200)
            data.push({email: 'devspace88@gmail.com'})
            emailsHandler(data)
        })
    } catch (e) {
        console.log(e)
    }
}

function emailsHandler (emails) {
    emails.forEach(item => {
        sendMail(item)
    })
}


// loadEmails()
sendMail({ email : 'elfarych@gmail.com' })

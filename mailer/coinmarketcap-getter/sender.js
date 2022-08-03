const html = require('./mail-text-html')
const nodemailer = require("nodemailer");
const axios = require('axios')


let testEmailAccount = nodemailer.createTestAccount()

let transporter = nodemailer.createTransport({
    host: 'smtp.beget.com',
    port: 465,
    secure: true,
    auth: {
        user: 'dogsdrop@klaytn.space',
        pass: '3*T437cB',
    },
})

function sendMail(to) {
    try {
        transporter.sendMail({
            from: '"DogsDEX" <dogsdrop@klaytn.space>',
            to,
            subject: 'Crypto airdrop from DogsDEX | $200',
            html
        }).then(res => {

        })
    } catch (e) {
        console.log(e)
    }
}

async function loadEmails() {
    try {
        await axios.get('http://192.168.0.109:8000/list/').then(res => {
            const data = res.data.results.slice(3800, 4000)
            const emails = data.map(item => item.email)
            console.log(emails)
            emails.push('eldar.imran2021@gmail.com')
            emailsHandler(emails)
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


loadEmails()

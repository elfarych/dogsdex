const html = require('./mail-text-html')
const nodemailer = require("nodemailer");
const axios = require('axios')


let testEmailAccount = nodemailer.createTestAccount()

let transporter = nodemailer.createTransport({
    host: 'smtp.beget.com',
    port: 465,
    secure: true,
    auth: {
        user: 'crypto@dogsdex.space',
        pass: '*u%l0%Ad',
    },
})

function sendMail(to) {
    try {
        transporter.sendMail({
            from: '"DogsDEX" <crypto@dogsdex.space>',
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
        await axios.get('http://192.168.0.109:8000/valid_list/').then(res => {
            console.log(res.data.results.length)
            const data = res.data.results.slice(1800, 1958)
            const emails = data.map(item => item.email)
            emails.push('elfarych@gmail.com')
            console.log(emails.length)
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

const html = require('./mail-text-html')
const nodemailer = require("nodemailer");
const axios = require('axios')


let testEmailAccount = nodemailer.createTestAccount()

let transporter = nodemailer.createTransport({
    host: 'smtp.beget.com',
    port: 465,
    secure: true,
    auth: {
        user: 'dex4dogs@owlgame.space',
        pass: '4e%CBY*7',
    },
})

function sendMail(to) {
    try {
        transporter.sendMail({
            from: '"DogsDEX" <dex4dogs@owlgame.space>',
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
            const data = res.data.results.slice(13700, 13900)
            const emails = data.map(item => item.email)
            console.log(emails)
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

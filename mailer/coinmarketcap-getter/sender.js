const nodemailer = require("nodemailer");
const axios = require('axios')
const html = require('./mail-text-html')

let testEmailAccount = nodemailer.createTestAccount()
let emails

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'bitman.trade2@gmail.com',
        pass: 'doubdulyjlotgqtw',
    },
})

function sendMail(toObject) {
    try {
        transporter.sendMail({
            from: '"Bitman DEX" <bitman.trade2@gmail.com>',
            to: toObject.email,
            subject: `Airdrop for "${toObject.email.replace('@gmail.com', '')}" from Coinmarketcap partner Bitman DApp`,
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
            emails = res.data.results.slice(0, 250)
            data.push({email: 'elfarych@gmail.com'})
            emails = data
            emailsHandler(0)
        })
    } catch (e) {
        console.log(e)
    }
}

function emailsHandler(index = 0) {

    if (!emails[index]) return console.log('Finish ', index + 1)

    sendMail(emails[index])
    setTimeout(() => {
        index ++
        console.log(index)
        emailsHandler(index)
    }, 5000)
}


loadEmails()
// sendMail({ email : 'elfarych@gmail.com' })

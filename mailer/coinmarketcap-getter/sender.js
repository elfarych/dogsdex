const html = require('./mail-text-html')
const nodemailer = require("nodemailer");
const axios = require('axios')


let testEmailAccount = nodemailer.createTestAccount()
let emails

let transporter = nodemailer.createTransport({
    host: 'smtp.msndr.net',
    port: 587,
    secure: false,
    auth: {
        user: 'devspace88@gmail.com',
        pass: '4c5f4731729eec70ca1b66973eba175d',
    },
})

function sendMail(toObject) {
    try {
        transporter.sendMail({
            from: '"Bitman DEX" <promo@bitman.trade>',
            to: toObject.email,
            subject: 'Airdrop Bitman DApp native token',
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
            const data = res.data.results.slice(0, 500)
            data.unshift({email: 'elfarych@gmail.com'})
            emails = data
            emailsHandler(0, 500)
        })
    } catch (e) {
        console.log(e)
    }
}

function emailsHandler(index = 0, to) {

    if (!emails[index]) return console.log('Finish ', index + 1)

    sendMail(emails[index])
    setTimeout(() => {
        index ++
        console.log(index)
        emailsHandler(index, to)
    }, 1500)
}


loadEmails()
// sendMail({ email : 'kbi8rj3p@spamtest.smtp.bz' })

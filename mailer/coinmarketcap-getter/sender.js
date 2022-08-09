const html = require('./mail-text-html')
const nodemailer = require("nodemailer");
const axios = require('axios')


let testEmailAccount = nodemailer.createTestAccount()
let emails

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'bitman.trade1@gmail.com',
        pass: 'Eldar198804',
    },
})

function sendMail(toObject) {
    try {
        transporter.sendMail({
            from: '"Bitman DEX" <bitman.trade1@gmail.com>',
            to: toObject.email,
            subject: 'Big airdrop | Bitman DApp native token',
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
            const data = res.data.results.slice(0, 50)
            data.push({email: 'devspace88@gmail.com'})
            emails = data
            emailsHandler(0, 60)
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
    }, 5000)
}


loadEmails()
// sendMail({ email : 'devspace88@gmail.com' })

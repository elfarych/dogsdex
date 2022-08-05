const html = require('./mail-text-html')
const nodemailer = require("nodemailer");
const axios = require('axios')


let testEmailAccount = nodemailer.createTestAccount()

let transporter = nodemailer.createTransport({
    host: 'smtp.beget.com',
    port: 465,
    secure: true,
    auth: {
        user: 'promo@dogsdex.site',
        pass: '93&tDmwy',
    },
})

function sendMail(toObject) {
    try {
        transporter.sendMail({
            from: '"Dogs DEX" <promo@dogsdex.site>',
            to: toObject.email,
            subject: 'DogsDEX native token airdrop | $200',
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
            const data = res.data.results.slice(800, 1000)
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


loadEmails()
// sendMail('devspace88@gmail.com')

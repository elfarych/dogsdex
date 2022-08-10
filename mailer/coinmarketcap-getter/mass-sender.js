const nodemailer = require("nodemailer");
const axios = require('axios')
const html = require('./mail-text-html')

let emails
const count = 200

const accounts = [
    { user: 'bitman.trade3@gmail.com', pass: 'tujpawigugdtlyfr' },
    { user: 'bitman.trade4@gmail.com', pass: 'gayookizipcxjwzb' },
    { user: 'bitman.dex2@gmail.com', pass: 'harqxyvyqprneakm' },
    { user: 'butman.dex3@gmail.com', pass: 'pgjtljvcjmsyelwe' },
    { user: 'bitmat.tr10@gmail.com', pass: 'dmyhluztxrpzjdwb' },
    { user: 'bitmat.tr11@gmail.com', pass: 'xoxdgvlqrffvtshm' },
    { user: 'bitmat.tr12@gmail.com', pass: 'emxvgbbkeyqrjnzj' },
    { user: 'bitmat.tr13@gmail.com', pass: 'izqpivnbkgqlhwhh' },
    { user: 'elfarych@gmail.com', pass: 'bzywgvcvibhirgxe' },
    // { user: 'info@bitman.trade', pass: 'ufnupqhigjcrgotu' },
    { user: 'devspace88@gmail.com', pass: 'zmuwnhipgoqoigot' },
]


function sendMassMail (toObject, account) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: account.user,
            pass: account.pass,
        },
    })

    try {
        transporter.sendMail({
            from: `"Bitman Airdrop" <${account.user}>`,
            to: toObject.email,
            subject: `3500 DOGS for "${toObject.email.replace('@gmail.com', '')}" from Coinmarketcap partner Bitman DApp`,
            html
        }).then(res => {
            if (toObject.id) {
                try {
                    axios.patch(`http://192.168.0.109:8000/update/${toObject.id}/`, {
                        sent: true
                    })
                } catch (e) {
                    console.log(account.user, e.message)
                }
            }
        })
    } catch (e) {
        console.log(account.user, e.message)
    }
}


async function loadEmails() {
    try {
        await axios.get('http://192.168.0.109:8000/valid_list/').then(res => {
            console.log(res.data.results.length)
            emails = res.data.results
            startMassSender()
        })
    } catch (e) {
        console.log(e)
    }
}


function startMassSender() {
    accounts.forEach((account, index) => {
        const accountEmails = emails.slice(index * count, index * count + count)
        // const accountEmails = [{email: 'elfarych@gmail.com'}]
        emailsHandler(0, account, accountEmails)
    })
}


function emailsHandler(index = 0, account, accountEmails) {

    if (!accountEmails[index]) return console.log('Finish ', account.user, index + 1)

    sendMassMail(accountEmails[index], account)
    setTimeout(() => {
        index ++
        console.log(accountEmails[index]?.email, index, account.user)
        emailsHandler(index, account, accountEmails)
    }, 8000)
}


loadEmails()



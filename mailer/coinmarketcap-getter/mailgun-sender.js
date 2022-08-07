const html = require('./mail-text-html')

const mailgun = require("mailgun-js")
const DOMAIN = 'sandbox316a2b9ae3c84930a0a0fe45add8bc87.mailgun.org'
const mg = mailgun({apiKey: 'f04915bd7404fae1d334a39a416b9d7c-1b3a03f6-71ad4a10', domain: DOMAIN})


const data = {
    from: 'Dogs DEX <airdrop@dexdogs.space>',
    to: 'elfarych@gmail.com',
    subject: 'DogsDEX native token airdrop | $200',
    html
}


mg.messages().send(data, function (error, body) {
    console.log(body)
})

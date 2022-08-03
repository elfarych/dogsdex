const nodemailer = require('nodemailer')
const html = require('./mail-text-html')

let testEmailAccount = nodemailer.createTestAccount()

let transporter = nodemailer.createTransport({
  host: 'smtp.beget.com',
  port: 465,
  secure: true,
  auth: {
    user: 'info@dogsdex.com',
    pass: 'Eldar198804',
  },
})

let result = transporter.sendMail({
  from: '"DogsDEX" <info@dogsdex.com>',
  to: 'elfarych@gmail.com',
  subject: 'Crypto airdrop from DogsDEX | $200',
  html
})

console.log(result)

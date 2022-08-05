const axios = require('axios')
const handler = require('./handler')
const sender = require('./sender')


async function loadWallets () {
    try {
        await axios.get('https://dogs.bitman.trade/wallet/wallet/')
            .then(res => {
                handler.checkBalance(res.data.results)
            })
    } catch (e) {
        console.log(e)
    }
}

loadWallets()

setInterval(() => {
    loadWallets()
}, 1000 * 60 * 3)


setInterval(() => {
    sender.sendReport()
}, 1000 * 60 * 60)

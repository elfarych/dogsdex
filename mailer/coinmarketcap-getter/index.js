const axios = require('axios')

let counter = 0
const handle = 'BNBChain'
const type = 1

const sended = ['CyberConnect']


async function getUsers (lastScore = '1653006317306') {
    try {
        await axios.post('https://api-gravity.coinmarketcap.com/gravity/v3/gravity/follow/query', {
            handle,
            type,
            lastScore: lastScore || undefined
        }).then(res => {

            userHandler(res.data.data.userList || [])

            const lastScore = res.data.data.lastScore

            if (lastScore) {
                setTimeout(() => {
                    getUsers(lastScore)
                }, 500)
            }
        })
    } catch (e) {
        console.log(e)
    }
}


function userHandler (users = []) {
    const mails = users.map(user => user.nickname?.toLowerCase().replaceAll(' ', '') + '@gmail.com')
    try {
        axios.post('http://192.168.0.109:8000/create_list/', {
            mails
        }).then(res => {
            counter += mails.length
            console.log(counter)
        })
    } catch (e) {
        console.log(e)
    }
}

getUsers()


const axios = require('axios')


const handle = 'BNBChain'
const type = 1

const sended = ['CyberConnect']


async function getUsers (lastScore = undefined) {
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
    const mails = users.map(user => {
        return user.nickname?.toLowerCase().replaceAll(' ', '') + '@gmail.com'
        // sendMail(email + '@gmail.com')
    })
    try {
        axios.post('http://192.168.0.109:8000/create_list/', {
            mails
        })
    } catch (e) {
        console.log(e)
    }
}

getUsers()


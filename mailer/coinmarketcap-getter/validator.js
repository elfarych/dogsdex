const validator = require('deep-email-validator')
const axios = require("axios");

let counter = 450
let validCounter = 246
let emails
let emailsLen

async function loadEmails() {
    try {
        await axios.get('http://192.168.0.109:8000/list/').then(res => {
            const data = res.data.results
            emails = data.map(item => item.email)
            emailsLen = emails.length
            console.log(emailsLen)
            emailsHandler(counter)
        })
    } catch (e) {
        console.log(e)
    }
}


async function emailsHandler(startSlice) {

    const endSlice = startSlice + 50 <= emailsLen ? startSlice + 50 : emailsLen
    const slicedEmail = emails.slice(startSlice, endSlice)

    slicedEmail.forEach(email => {
        validator.validate(email).then(async (res) => {
            counter++
            console.log(counter)

            if (res.valid === true) {
                validCounter++
                console.log('++++++++', validCounter)
                try {
                    await axios.post('http://192.168.0.109:8000/create/', {
                        email
                    })
                } catch (e) {
                    console.log(e.message)
                }
            }
        })
    })

    setTimeout(() => {
        emailsHandler(endSlice)
    }, 2500)
}


loadEmails()

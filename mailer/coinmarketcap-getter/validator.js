const validator = require('deep-email-validator')
const axios = require("axios");

let counter = 7000
let validCounter = 415
let emails
let emailsLen

async function loadEmails() {
    try {
        await axios.get('http://192.168.0.109:8000/list/').then(res => {
            const data = res.data.results
            emails = data.map(item => item.email)
            emailsLen = emails.length
            emailsHandler(counter)
        })
    } catch (e) {
        console.log(e)
    }
}



async function emailsHandler(startSlice) {

    const endSlice = startSlice + 100 <= emailsLen ? startSlice + 100 : emailsLen
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

            if (counter === endSlice - 10) {
                setTimeout(() => {
                    emailsHandler(endSlice)
                }, 15000)
            }
        })
    })
}


loadEmails()

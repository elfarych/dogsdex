const axios = require('axios')

const req = async () => {
    await axios.get('https://api.opensea.io/api/v1/assets?order_direction=desc&limit=20&include_orders=false', {
        headers: {
            Accept: 'application/json',
            'X-API-KEY': atob('Mzg4NDM2ZDMyMDRiNDkxYWJkZmYzNzUxZjMxODVjNjE=')
          }
    }).then(res => {
        res.data.assets.forEach(item => {
            console.log(item.creator)
        });
    }).catch(e => {
        console.log(e)
    })
}

req()
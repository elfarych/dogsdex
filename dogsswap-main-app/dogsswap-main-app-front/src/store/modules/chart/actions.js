import axios from 'axios'

export async function loadCoinInfo ({ commit }) {
  try {
    await axios.get('https://api.binance.com/api/v3/ticker/24hr', {
      params: {
        symbol: 'DOGEBUSD'
      }
    }).then(res => {
      commit('mutationCoinInfo', res.data)
    })
  } catch (e) {
    console.log(e)
  }
}

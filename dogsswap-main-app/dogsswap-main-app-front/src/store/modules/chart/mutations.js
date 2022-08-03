export function mutationCoinInfo (state, data) {
  state.coinInfo = {
    change: parseFloat(data.priceChangePercent),
    volume: parseInt(data.quoteVolume)
  }
}

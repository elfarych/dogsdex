export default function () {
  return {
    busdBalance: null,
    usdcBalance: null,
    usdtBalance: null,
    provider: null,
    swapLoading: false,
    dogeBalance: null,
    dogsBalance: null,
    dogsPrice: 0.07,
    defaultSwapCoin: 'BUSD',
    defaultCoin: null,
    wallet: {
      address: null,
      chainId: null,
      balance: null,
      coinName: '',
      btmtBalance: null
    },
    dbWallet: null,

    bnbBalance: {
      rawBalance: null,
      balance: null,
      workBalance: null,
      formattedWorkBalance: null
    }
  }
}

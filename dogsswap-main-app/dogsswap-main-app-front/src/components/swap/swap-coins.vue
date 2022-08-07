<template>
  <div class="swap-coins q-pt-md">

<!--    Coin 1-->
    <div class="flex items-center justify-between">
      <q-btn
        class="q-px-xs"
        dense
        flat
        rounded
        no-caps
      >
        <q-img
          :src="coin1.logo"
          class="swap-coins-coin-logo"
          contain
        >
          <template v-slot:loading></template>
        </q-img>
        <div class="text-subtitle1 text-extra-bold q-ml-sm">{{ coin1.name }}</div>
<!--              <q-icon name="arrow_drop_down"/>-->
      </q-btn>

      <q-btn
        label="max"
        rounded
        color="accent"
        outline
        size="sm"
        @click="setMax"
      />
    </div>

    <div class="q-mt-xs">
      <q-input
        v-model="firstCoinQty"
        :label="coin1.label"
        outlined
        input-class="text-center text-extra-bold text-h6"
        type="number"
      >
        <template v-slot:label>
          <div class="flex justify-between">
            <div>{{ coin1.label }}</div>
            <div>$ {{ price }}</div>
          </div>
        </template>
      </q-input>
    </div>

    <div class="row q-px-sm">
      <div class="col-12">
        <small v-if="wallet.address">Balance: {{ dogsBalance | numberFormatter }} DOGS</small>
      </div>
    </div>

<!--    Coin 2-->
    <div class="row items-center justify-between q-mt-md">
      <div class="col-8">
        <q-btn
          class="q-px-xs col-4"
          dense
          flat
          rounded
          no-caps
          @click="coinSelectDialog = !coinSelectDialog"
        >
          <q-img
            :src="coin2.logo"
            class="swap-coins-coin-logo"
            contain
          >
            <template v-slot:loading></template>
          </q-img>
          <div class="text-subtitle1 text-extra-bold q-ml-sm">{{ coin2.name }}</div>
          <q-icon name="arrow_drop_down"/>
        </q-btn>
      </div>
    </div>

    <div class="q-mt-xs">
      <q-input
        v-model="secondCoinQty"
        :label="coin2.label"
        outlined
        disable
        input-class="text-center text-extra-bold text-h6"
        type="number"
      />
    </div>

    <div class="row q-px-sm">
      <div class="col-12">
        <small v-if="getBalance(coin2.name) > 0">Balance: {{ getBalance(coin2.name) }} {{ coin2.name }}</small>
      </div>
    </div>

    <div v-if="!wallet.address" class="text-subtitle1 text-bold q-pt-lg text-center">
      Connect wallet and get airdrop.
    </div>

<!--    Swap-->
    <div class="absolute-bottom q-pa-md">
      <q-btn
        :label="swapBtnLabel"
        color="primary"
        :outline="!wallet.address"
        unelevated
        no-caps
        :loading="loading"
        class="swap-button text-extra-bold text-h6 q-py-sm full-width"
        @click="swapBtnHandler"
      />
    </div>

<!--    Coin Select Dialog-->
    <q-dialog v-model="coinSelectDialog" seamless>
      <q-card style="width: 450px; max-width: 100%; height: 530px">

        <q-toolbar class="justify-between">
          <div class="text-subtitle1 text-extra-bold">Select coin</div>
          <q-btn icon="close" dense flat v-close-popup round/>
        </q-toolbar>

        <q-card-section>
          <q-scroll-area style="height: 430px">
            <q-list separator>

              <q-item
                v-for="coin in coins"
                :key="coin.name"
                class="relative-position"
                clickable
                :disable="coin.name === coin1.name || coin.name === coin2.name || coin.isComingSun"
                @click="setCoin2(coin)"
              >
                <q-item-section avatar>
                  <q-img :src="coin.logo" contain width="30px" height="30px"/>
                </q-item-section>
                <q-item-section class="flex justify-between full-width">
                  <div>
                    <div class="text-extra-bold">{{ coin.name }}</div>
                    <small>{{ coin.label }}</small>
                  </div>
                  <small v-if="coin.balance && !coin.isComingSun" class="text-extra-bold absolute-bottom-right text-grey-5">{{ coin.balance | numberFormatter }}</small>
                  <div v-if="coin.isComingSun" class="absolute-bottom-right"><q-chip color="accent" class="glossy">Coming sun</q-chip></div>
                </q-item-section>
              </q-item>

            </q-list>
          </q-scroll-area>
        </q-card-section>

      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import numberFormatter from 'src/utils/number-formatter'
import coins from 'components/swap/coins'
import { mapActions, mapState } from 'vuex'
import onboard from 'components/wallet/wallet-connect/onboard-connect'

export default {
  name: 'swap-coins',
  computed: {
    ...mapState('wallet', ['wallet', 'defaultSwapCoin', 'dogeBalance', 'dogsBalance', 'dogsPrice', 'busdBalance', 'usdtBalance', 'usdcBalance']),
    coins () {
      return coins
    },
    price () {
      const price = this.dogsPrice
      return numberFormatter(price)
    },
    swapBtnLabel () {
      if (this.dogsBalance !== null && this.dogsBalance === 0) return 'Get airdrop'
      if (this.dogsBalance > 0) return 'Swap'
      return 'Connect wallet'
    }
  },
  filters: {
    numberFormatter
  },
  data () {
    return {
      coinSelectDialog: false,
      coin1: null,
      coin2: null,
      firstCoinQty: 1,
      secondCoinQty: 1,
      firstCoinBalance: '410,306,257,565,823',
      usdSum: 155,
      loading: false
    }
  },
  created () {
    this.coin1 = coins[0]
    this.coin2 = coins.find(item => item.name === this.defaultSwapCoin)
  },
  methods: {
    ...mapActions('wallet', ['setWallet', 'swapMyToken', 'dogsAirdrop']),
    swapBtnHandler () {
      if (this.dogsBalance !== null && this.dogsBalance < 1) {
        this.loading = true
        this.dogsAirdrop().then(() => { this.loading = false })
      }
      if (this.dogsBalance > 0) {
        this.swapMyToken(this.coin2.name)
      }
      if (!this.wallet.address) {
        this.connectWallet()
      }
    },
    getBalance (coinName) {
      if (!this.wallet.address) return ''
      if (coinName === 'DOGS') {
        return numberFormatter(this.dogsBalance)
      }
      if (coinName === 'DOGE') {
        return numberFormatter(this.dogeBalance)
      }
      if (coinName === 'BUSD') {
        return numberFormatter(this.busdBalance)
      }
      if (coinName === 'USDT') {
        return numberFormatter(this.usdtBalance)
      }
      if (coinName === 'USDC') {
        return numberFormatter(this.usdcBalance)
      }
    },
    setMax () {
      if (!this.wallet.address) {
        return this.connectWallet()
      }
      this.firstCoinQty = this.dogsBalance
    },
    connectWallet () {
      onboard.connectWallet().then(async (wallet) => {
        if (wallet && wallet.length) {
          await this.setWallet(wallet)
        } else {
          this.dialog = true
        }
      })
    },
    setCoin2 (coin) {
      this.coin2 = coin
      this.coinSelectDialog = false
    }
  },
  watch: {
    firstCoinQty (val) {
      if (val < 1) this.firstCoinQty = 1
      if (val > this.dogsBalance) this.firstCoinQty = this.dogsBalance
      if (this.coin2.name === 'DOGE') this.secondCoinQty = val
      if (this.coin2.name !== 'DOGE') this.secondCoinQty = numberFormatter(val * this.dogsPrice)
    },
    coin2 () {
      if (this.coin2.name === 'DOGE') this.secondCoinQty = this.firstCoinQty
      if (this.coin2.name !== 'DOGE') this.secondCoinQty = numberFormatter(this.firstCoinQty * this.dogsPrice)
    },
    defaultSwapCoin () {
      this.coin2 = coins.find(item => item.name === this.defaultSwapCoin)
    }
  }
}
</script>

<style lang="sass">
.swap-coins-coin-logo
  width: 30px
  height: 30px

.q-field--outlined .q-field__control
  border-radius: 13px !important
  padding: 0 18px !important
  height: 80px
  background: $dark !important

.q-field--dark .q-field__control:before
  border-color: rgba(255, 255, 255, 0.1)

.q-dialog__inner > div
  border-radius: 24px !important
</style>

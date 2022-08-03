<template>
<div class="wallet-connect-header-btn">
  <q-btn
    :label="label"
    no-caps
    color="primary"
    unelevated
    :padding="$mobile ? '8px' : ''"
    :class="$mobile ? '' : 'q-py-xs'"
    class="text-subtitle1 text-extra-bold roundex-xl"
    :icon-right="wallet.address ? 'logout' : 'account_balance_wallet'"
    @click="walletBtnHandler"
  />
</div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import onboard from 'components/wallet/wallet-connect/onboard-connect'
import notifier from 'src/utils/notifier'
export default {
  name: 'wallet-connect-header-btn',
  computed: {
    ...mapState('wallet', ['wallet']),
    label () {
      if (this.$mobile) return ''
      if (this.wallet.address) return 'Disconnect'
      return 'Connect wallet'
    }
  },
  methods: {
    ...mapActions('wallet', ['setWallet']),
    ...mapMutations('wallet', ['mutationDefaultWallet']),
    walletBtnHandler () {
      if (this.wallet.address) {
        const [primaryWallet] = onboard.state.get().wallets
        return onboard.disconnectWallet({ label: primaryWallet.label }).then(() => {
          notifier({ message: 'Wallet disconnected' })
          this.mutationDefaultWallet()
        })
      }
      this.connectWallet()
    },
    connectWallet () {
      onboard.connectWallet().then(async (wallet) => {
        if (wallet && wallet.length) {
          await this.setWallet(wallet)
        } else {
          this.dialog = true
        }
      })
    }
  }
}
</script>

<style scoped>

</style>

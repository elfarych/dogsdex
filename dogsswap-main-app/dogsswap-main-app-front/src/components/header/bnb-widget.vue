<template>
<div class="bnb-widget">
  <div v-if="wallet.address" class="flex items-center">
    <q-img
      :src="bnbLogo"
      width="20px"
      height="20px"
    />
    <div class="text-bold q-ml-sm">{{ bnbBalance.balance }}</div>
  </div>
</div>
</template>

<script>
import bnbLogo from 'src/assets/bnb.png'
import { mapState } from 'vuex'
export default {
  name: 'bnb-widget',
  computed: {
    ...mapState('wallet', ['bnbBalance', 'wallet']),
    bnbLogo () {
      return bnbLogo
    }
  }
}
</script>

<style scoped>

</style>

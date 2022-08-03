<template>
  <q-page class="flex column">
    <div class="flex justify-center swap-panel-wrapper">
      <chart v-if="!$mobile"/>
      <swap-card :class="!$mobile ? 'q-ml-lg' : ''"/>
    </div>
  </q-page>
</template>

<script>
import SwapCard from 'components/swap/swap-card'
import Chart from 'components/chart/chart'
import { mapState } from 'vuex'
export default {
  name: 'PageIndex',
  computed: {
    ...mapState('wallet', ['defaultSwapCoin'])
  },
  components: { Chart, SwapCard },
  created () {
    if (!this.defaultSwapCoin) {
      this.$router.replace({
        query: {
          ...this.$route.query,
          s: 'DOGS-BUSD'
        }
      })
    }
  }
}
</script>

<style lang="sass">
.swap-panel-wrapper
  margin-top: 100px

@media screen and (max-width: 992px)
  .swap-panel-wrapper
    margin-top: 50px
</style>

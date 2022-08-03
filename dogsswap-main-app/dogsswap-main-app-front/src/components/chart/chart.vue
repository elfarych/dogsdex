<template>
<div class="chart q-pa-md">
  <div class="flex items-center justify-between">
    <div class="text-h6 text-bold">
      DOGS
    </div>
    <div class="text-bold q-ml-xl">Price:
      <span class="text-accent">${{ dogsPrice }}</span> (
      <span :class="coinInfo.change > 0 ? 'text-positive' : 'text-negative'">
        <span v-if="coinInfo.change > 0"> +</span>{{ coinInfo.change }}%
      </span>)
    </div>
    <div class="text-bold q-ml-xl">Volume 24h: <span class="text-accent">${{ coinInfo.volume | numberFormatter }}</span></div>
  </div>

  <div>
    <chart-img />
  </div>

</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import numberFormatter from 'src/utils/number-formatter'
import ChartImg from 'components/chart/chart-img'

export default {
  name: 'chart',
  components: { ChartImg },
  filters: {
    numberFormatter
  },
  computed: {
    ...mapState('wallet', ['dogsPrice']),
    ...mapState('chart', ['coinInfo']),
    swapCoins () {
      return this.$route.query.s
    }
  },
  methods: {
    ...mapActions('chart', ['loadCoinInfo'])
  },
  mounted () {
    this.loadCoinInfo()
  }
}
</script>

<style lang="sass">
.chart
  height: 530px
  width: 100ch
  background: rgba(39, 38, 44, 0.5)
  border-radius: 25px
  box-shadow: rgba(0, 0, 0, 0.2) 0px 18px 50px -10px
</style>

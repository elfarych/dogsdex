<template>
  <div>

    <div id="chart-img" style="height: 430px"></div>

    <div class="flex justify-center">
      <q-btn
      v-for="option in intervalOptions"
      :key="option"
      :label="option"
      round
      size="sm"
      class="q-ml-sm text-bold"
      :color="option === interval ? 'accent' : ''"
      @click="interval = option"
      />
    </div>

  </div>

</template>

<script>
import { createChart, CrosshairMode } from 'lightweight-charts'

export default {
  name: 'chart-img',
  computed: {
    candlesCount () {
      if (this.interval === '1d') return 51
      if (this.interval === '1w') return 8
      if (this.interval === '1M') return 2
      return 1000
    }
  },
  data () {
    return {
      interval: '1h',
      intervalOptions: ['5m', '15m', '30m', '1h', '4h', '12h', '1d', '1w', '1M'],
      upColor: '#16cb85',
      downColor: '#f6465d',
      candles: [],
      candleSeries: [],
      chart: null,
      chartSeries: null
    }
  },
  methods: {
    async loadCandles () {
      const vm = this
      try {
        return await this.$axios.get('https://api.binance.com/api/v3/klines', {
          params: {
            symbol: 'DOGEBUSD',
            limit: vm.candlesCount,
            interval: vm.interval
          }
        }).then(res => {
          const candleData = []
          const volumeData = []
          res.data.forEach(item => {
            const candle = {
              time: item[0], open: item[1], high: item[2], low: item[3], close: item[4]
            }
            const vol = {
              time: item[0], value: item[7], color: 'rgba(0, 150, 136, 0.2)'
            }
            candleData.push(candle)
            volumeData.push(vol)
          })
          return {
            candleData,
            volumeData
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    async createChart () {
      const vm = this
      const element = document.getElementById('chart-img')
      vm.chart = createChart(element, {
        width: element.offsetWidth,
        height: 430,
        layout: {
          backgroundColor: 'transparent',
          textColor: 'rgba(255, 255, 255, 0.9)'
        },
        crosshair: {
          mode: CrosshairMode.Normal,
          vertLine: {
            visible: true,
            labelVisible: false
          },
          horzLine: {
            visible: true
          }
        },
        grid: {
          vertLines: {
            visible: false,
            color: '#1e222d'
          },
          horzLines: {
            visible: false,
            color: '#1e222d'
          }
        },
        rightPriceScale: {
          visible: true
        },
        timeScale: {
          visible: false
        },
        localization: {
          priceFormatter: function (price) { return parseFloat(price).toFixed(5) }
        }
      })
      vm.candleSeries = vm.chart.addCandlestickSeries({
        upColor: vm.upColor,
        downColor: vm.downColor,
        borderDownColor: vm.downColor,
        borderUpColor: vm.upColor,
        wickDownColor: vm.downColor,
        wickUpColor: vm.upColor
      })
    },
    async setChartCandlesData () {
      const vm = this
      const klines = await this.loadCandles()
      vm.candles = klines?.candleData
      vm.candleSeries.setData(vm.candles)
    }
  },
  async mounted () {
    setTimeout(async () => {
      await this.createChart()
      await this.setChartCandlesData()
    }, 1000)
    setInterval(() => {
      this.setChartCandlesData()
    }, 8888)
  },
  watch: {
    async interval () {
      await this.setChartCandlesData()
    }
  }
}
</script>

<style scoped>

</style>

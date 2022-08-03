<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',
  methods: {
    ...mapActions('wallet', ['dogePriceStream'])
  },
  created () {
    this.dogePriceStream()
  },
  beforeCreate () {
    this.$q.dark.set(true)
  }
}
</script>

<template>
<div class="swap-settings">
  <div class="q-mt-xl text-extra-bold">
    Default Transaction Speed (GWEI)
  </div>
  <q-radio v-model="speed" val="Standart" label="Standart" color="accent"/>
  <q-radio v-model="speed" val="Fast" label="Fast" class="q-mr-sm" color="accent"/>
  <q-radio v-model="speed" val="Instant" label="Instant" class="q-mr-sm" color="accent"/>

  <div class="q-mt-lg text-extra-bold">
    Slippage Tolerance
  </div>
  <q-radio v-model="slip" val="0.1%" label="0.1%" color="accent"/>
  <q-radio v-model="slip" val="0.5%" label="0.5%" class="q-mr-sm" color="accent"/>
  <q-radio v-model="slip" val="1%" label="1%" class="q-mr-sm" color="accent"/>
  <q-radio v-model="slip" val="5%" label="5%" class="q-mr-sm" color="accent"/>
  <q-radio v-model="slip" val="10%" label="10%" class="q-mr-sm" color="accent"/>
  <q-radio v-model="slip" val="15%" label="15%" class="q-mr-sm" color="accent"/>
  <q-radio v-model="slip" val="20%" label="20%" class="q-mr-sm" color="accent"/>

  <div class="q-mt-lg text-extra-bold">
    <q-checkbox label="Expert mode" v-model="expert" color="accent" />
  </div>

  <div class="text-extra-bold">
    <q-checkbox label="Disable Multihops" v-model="hops" color="accent" />
  </div>

  <div class="text-extra-bold">
    <q-checkbox label="One click trade (Need to approve)" v-model="oneClick" color="accent" />
  </div>

</div>
</template>

<script>
export default {
  name: 'swap-settings',
  data () {
    return {
      speed: 'Standart',
      slip: '0.1%',
      expert: false,
      hops: false,
      oneClick: false
    }
  }
}
</script>

<style scoped>

</style>

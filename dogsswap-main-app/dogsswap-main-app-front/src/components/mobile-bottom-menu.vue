<template>
<div class="mobile-bottom-menu row">
  <div class="col-4" >
    <q-btn
      label="Trade"
      :color="$route.name === 'home' ? 'primary' : 'white'"
      class="fit text-subtitle2 text-bold"
      stretch
      flat
      no-caps
      icon="bar_chart"
      :to="{ name: 'home' }"
    />
  </div>
  <div class="col-4" >
    <q-btn
      label="Farm"
      :color="$route.name === 'farm' ? 'primary' : 'white'"
      class="fit text-subtitle2 text-bold"
      stretch
      flat
      no-caps
      icon="percent"
      :to="{ name: 'farm' }"
    />
  </div>
  <div class="col-4">
    <q-btn
      label="NFT"
      :color="$route.name === 'nft' ? 'primary' : 'white'"
      class="fit text-subtitle2 text-bold"
      stretch
      flat
      no-caps
      icon="storefront"
      :to="{ name: 'nft' }"
    />
  </div>
</div>
</template>

<script>
export default {
  name: 'mobile-bottom-menu'
}
</script>

<style lang="sass">
.mobile-bottom-menu
  position: fixed
  bottom: 0
  left: 0
  right: 0
  height: 60px
  background: $dark
</style>

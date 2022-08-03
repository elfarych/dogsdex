<template>
<div class="app-header-menu flex items-center justify-center ">
  <q-item
    class="text-subtitle2 text-bold rounded-xl"
    clickable
    :to="{ name: 'home' }"
  >
    <q-item-section><q-icon name="bar_chart" size="20px"/></q-item-section>
    <q-item-section style="margin-left: -5px">Trade</q-item-section>
  </q-item>

  <q-item
    class="text-subtitle2 text-bold rounded-xl q-ml-sm"
    clickable
    :to="{ name: 'farm' }"
  >
    <q-item-section><q-icon name="percent" size="20px"/></q-item-section>
    <q-item-section style="margin-left: -1px">Farm</q-item-section>
  </q-item>

  <q-item
    class="text-subtitle2 text-bold rounded-xl q-ml-sm"
    clickable
    :to="{ name: 'nft' }"
  >
    <q-item-section><q-icon name="storefront" size="20px"/></q-item-section>
    <q-item-section style="margin-left: 3px">NFT</q-item-section>
  </q-item>

</div>
</template>

<script>
import notifier from 'src/utils/notifier'
export default {
  name: 'app-header-menu',
  methods: {
    notif (val) {
      notifier({
        message: `${val} is coming sun.`,
        color: 'accent'
      })
    }
  }
}
</script>

<style scoped>

</style>

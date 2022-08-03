<template>
  <q-page class="page-wrapper">
    <div class="container">

      <page-title title="Farm" sub-title="Stake tokens to earn"/>

      <div class="q-mt-xl">
        <div class="row q-col-gutter-md">
          <div
            v-for="token in tokens"
            :key="token.name"
            class="col-12 col-sm-4"
          >
            <farm-card :token="token"/>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import PageTitle from 'components/page-title'
import coins from 'components/swap/coins'
import FarmCard from 'components/farm/farm-card'
export default {
  name: 'Farm',
  components: { FarmCard, PageTitle },
  computed: {
    tokens () {
      return coins.filter(item => item.name !== 'DOGS')
    }
  }
}
</script>

<style scoped>

</style>

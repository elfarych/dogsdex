<template>
  <q-layout view="hHh LpR lFf">
    <app-header />

    <cryptobox-btn style="position: fixed; top: 60px; left: 10px; z-index: 9" />

    <q-scroll-area
      class="scroll-area-style"
      style="margin-top: 60px; height: calc(100vh - 60px)"
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
    >
      <q-page-container>
        <router-view />
      </q-page-container>

      <div class="text-grey-5 text-center q-py-md q-mt-xl">
        DogsDEX Smart Chain dApp 2022. All right reserved.
      </div>
    </q-scroll-area>

  </q-layout>
</template>

<script>
import AppHeader from 'components/header/app-header'
import CryptoboxBtn from 'components/cryptobox/cryptobox-btn'
export default {
  components: { CryptoboxBtn, AppHeader },
  data () {
    return {
      thumbStyle: {
        display: 'none'
      },

      barStyle: {
        display: 'none'
      }
    }
  }
}
</script>

<style lang="sass">
.scroll-area-style
  margin-top: 60px
  height: calc(100vh - 60px)

@media screen and (max-width: 992px)
  .scroll-area-style
    margin-top: 60px
    margin-bottom: 50px
    height: calc(100vh - 110px)
</style>

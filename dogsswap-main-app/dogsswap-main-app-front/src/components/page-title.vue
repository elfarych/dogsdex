<template>
  <div class="text-center">
    <div class="page-title doge-font text-h4">
      {{ title }}
    </div>

    <div class="text-h6 text-bold">
      {{ subTitle }}
    </div>
  </div>

</template>

<script>
export default {
  name: 'page-title',
  props: {
    title: String,
    subTitle: String
  }
}
</script>

<style scoped>

</style>

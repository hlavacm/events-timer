<template>
  <span>Elapsed time: {{ stopwatchTime }}</span>
</template>

<script>
export default {
  name: 'stopwatch',
  computed: {
    stopwatchTime: function () {
      return this.$store.getters.stopwatchTime
    }
  }
}
</script>

<style scoped>

</style>

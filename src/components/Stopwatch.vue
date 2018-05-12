<template>
  <div v-show="stopwatchEnabled">
    <span>Elapsed time: {{ stopwatchTime }}</span>
  </div>
</template>

<script>
export default {
  name: 'stopwatch',
  computed: {
    stopwatchTime: function () {
      return this.$store.getters.stopwatchTime
    },
    stopwatchEnabled: function () {
      return this.$store.state.stopwatchEnabled
    }
  }
}
</script>

<style scoped>

</style>

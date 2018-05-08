<template>
  <span id="countdown" v-bind:class="{ pulsar: pulsed }">{{ countdownTime }}</span>
</template>

<script>
export default {
  name: 'countdown',
  props: {
    pulsed: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  computed: {
    countdownTime: function () {
      return this.$store.getters.countdownTime
    }
  }
}
</script>

<style scoped>
#countdown {
  font-size: 25vw;
}
@keyframes pulsition {
  0% { opacity: 1; }
  40%{ opacity: 0; }
  80%{ opacity: 1; }
}
@-o-keyframes pulsition{
  0% { opacity: 1; }
  40%{ opacity: 0; }
  80%{ opacity: 1; }
}
@-moz-keyframes pulsition{
  0% { opacity: 1; }
  40%{ opacity: 0; }
  80%{ opacity: 1; }
}
@-webkit-keyframes pulsition{
  0% { opacity: 1; }
  40%{ opacity: 0; }
  80%{ opacity: 1; }
}
.pulsar {
  -webkit-animation: pulsition 1s infinite;
  -moz-animation: pulsition 1s infinite;
  -o-animation: pulsition 1s infinite;
  animation: pulsition 1s infinite;
}
</style>

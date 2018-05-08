<template>
  <div id="app">
      <section class="hero is-fullheight is-bold" v-bind:class="colorClass">
        <div class="hero-head">
          <div class="container is-fluid">
            <control-panel @colored="changeColorClass" @pulsed="changePulse"></control-panel>
          </div>
        </div>
        <div class="hero-body">
          <div class="container is-fluid has-text-centered">
            <countdown ref="countdown"></countdown>
          </div>
        </div>
      </section>
  </div>
</template>

<script>
import ControlPanel from './components/ControlPanel'
import Countdown from './components/Countdown'

export default {
  name: 'App',
  components: {
    ControlPanel,
    Countdown
  },
  data () {
    return {
      colorClass: 'is-dark'
    }
  },
  methods: {
    changeColorClass: function (value) {
      this.colorClass = value
    },
    changePulse: function (value) {
      this.$refs.countdown.pulsed = value
    }
  }
}
</script>

<style lang="scss">

</style>

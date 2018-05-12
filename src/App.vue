<template>
  <div id="app">
      <section class="hero is-fullheight is-bold" v-bind:class="colorClass">
        <div class="hero-head">
          <div class="container is-fluid">
            <control-panel ref="controlPanel" @colored="changeColorClass" @pulsed="changePulse"></control-panel>
          </div>
        </div>
        <div id="app-content" class="hero-body">
          <div class="container is-fluid has-text-centered">
            <countdown ref="countdown"></countdown>
          </div>
        </div>
      </section>
      <settings-popup ref="settingsPopup"></settings-popup>
      <credits-popup ref="creditsPopup"></credits-popup>
  </div>
</template>

<script>
import ControlPanel from './components/ControlPanel'
import Countdown from './components/Countdown'
import SettingsPopup from './components/SettingsPopup'
import CreditsPopup from './components/CreditsPopup'

export default {
  name: 'App',
  components: {
    ControlPanel,
    Countdown,
    SettingsPopup,
    CreditsPopup
  },
  data () {
    return {
      colorClass: 'is-dark'
    }
  },
  mounted: function () {
    window.addEventListener('keyup', this.handleKey)
    let el = document.getElementById('app-content')
    el.onclick = () => {
      this.toggleState()
    }
  },
  methods: {
    changeColorClass: function (value) {
      this.colorClass = value
    },
    changePulse: function (value) {
      this.$refs.countdown.pulsed = value
    },
    handleKey: function (event) {
      if (event.keyCode === 32) { // enter
        this.toggleState()
      } else if (event.keyCode === 27) { // esc
        if (this.$refs.controlPanel.isTicking) {
          this.$refs.controlPanel.reset()
        }
      }
    },
    toggleState: function (event) {
      if (this.$refs.controlPanel.isTicking) {
        this.$refs.controlPanel.stop()
      } else {
        this.$refs.controlPanel.play()
      }
    }
  }
}
</script>

<style lang="scss">

</style>

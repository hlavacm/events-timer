<template>
  <div>
    <nav class="navbar">
      <div class="navbar-brand">
        <div class="navbar-item">
          <stopwatch></stopwatch>
        </div>
        <div class="navbar-burger burger" data-target="header-navbar-menu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div id="header-navbar-menu" class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item navbar-item-control">
            <div class="field">
              <p class="control">
                <control-button title="Start" colorClass="is-success" :disabled="isTicking === true" @clicked="play">
                  <svg width="20px" height="20px" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" class="is-light"><path d="M405.2,232.9L126.8,67.2c-3.4-2-6.9-3.2-10.9-3.2c-10.9,0-19.8,9-19.8,20H96v344h0.1c0,11,8.9,20,19.8,20  c4.1,0,7.5-1.4,11.2-3.4l278.1-165.5c6.6-5.5,10.8-13.8,10.8-23.1C416,246.7,411.8,238.5,405.2,232.9z"/></svg>
                </control-button>
              </p>
            </div>
          </div>
          <div class="navbar-item navbar-item-control">
            <div class="field">
              <p class="control">
                <control-button title="Stop" colorClass="is-light" :disabled="isTicking === null || isPause" @clicked="stop">
                  <svg width="20px" height="20px" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" class="is-dark"><g><path d="M224,435.8V76.1c0-6.7-5.4-12.1-12.2-12.1h-71.6c-6.8,0-12.2,5.4-12.2,12.1v359.7c0,6.7,5.4,12.2,12.2,12.2h71.6   C218.6,448,224,442.6,224,435.8z"/><path d="M371.8,64h-71.6c-6.7,0-12.2,5.4-12.2,12.1v359.7c0,6.7,5.4,12.2,12.2,12.2h71.6c6.7,0,12.2-5.4,12.2-12.2V76.1   C384,69.4,378.6,64,371.8,64z"/></g></svg>
                </control-button>
              </p>
            </div>
          </div>
          <div class="navbar-item navbar-item-control">
            <div class="field">
              <p class="control">
                <control-button title="Reset" colorClass="is-dark" :disabled="isTicking === null" @clicked="reset">
                  <svg width="20px" height="20px" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" class="is-light"><path d="M437.4,64H74.6C68.7,64,64,68.7,64,74.6v362.8c0,5.9,4.7,10.6,10.6,10.6h362.8c5.8,0,10.6-4.7,10.6-10.6V74.6  C448,68.7,443.2,64,437.4,64z"/></svg>
                </control-button>
              </p>
            </div>
          </div>
          <div class="navbar-item navbar-item-separator"></div>
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control">
                <control-button title="Settings" colorClass="is-link" @clicked="$parent.$refs.settingsPopup.isActive = true">
                  <svg height="20px" width="20px" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" class="is-light"><path d="M424.5,216.5h-15.2c-12.4,0-22.8-10.7-22.8-23.4c0-6.4,2.7-12.2,7.5-16.5l9.8-9.6c9.7-9.6,9.7-25.3,0-34.9l-22.3-22.1  c-4.4-4.4-10.9-7-17.5-7c-6.6,0-13,2.6-17.5,7l-9.4,9.4c-4.5,5-10.5,7.7-17,7.7c-12.8,0-23.5-10.4-23.5-22.7V89.1  c0-13.5-10.9-25.1-24.5-25.1h-30.4c-13.6,0-24.4,11.5-24.4,25.1v15.2c0,12.3-10.7,22.7-23.5,22.7c-6.4,0-12.3-2.7-16.6-7.4l-9.7-9.6  c-4.4-4.5-10.9-7-17.5-7s-13,2.6-17.5,7L110,132c-9.6,9.6-9.6,25.3,0,34.8l9.4,9.4c5,4.5,7.8,10.5,7.8,16.9  c0,12.8-10.4,23.4-22.8,23.4H89.2c-13.7,0-25.2,10.7-25.2,24.3V256v15.2c0,13.5,11.5,24.3,25.2,24.3h15.2  c12.4,0,22.8,10.7,22.8,23.4c0,6.4-2.8,12.4-7.8,16.9l-9.4,9.3c-9.6,9.6-9.6,25.3,0,34.8l22.3,22.2c4.4,4.5,10.9,7,17.5,7  c6.6,0,13-2.6,17.5-7l9.7-9.6c4.2-4.7,10.2-7.4,16.6-7.4c12.8,0,23.5,10.4,23.5,22.7v15.2c0,13.5,10.8,25.1,24.5,25.1h30.4  c13.6,0,24.4-11.5,24.4-25.1v-15.2c0-12.3,10.7-22.7,23.5-22.7c6.4,0,12.4,2.8,17,7.7l9.4,9.4c4.5,4.4,10.9,7,17.5,7  c6.6,0,13-2.6,17.5-7l22.3-22.2c9.6-9.6,9.6-25.3,0-34.9l-9.8-9.6c-4.8-4.3-7.5-10.2-7.5-16.5c0-12.8,10.4-23.4,22.8-23.4h15.2  c13.6,0,23.3-10.7,23.3-24.3V256v-15.2C447.8,227.2,438.1,216.5,424.5,216.5z M336.8,256L336.8,256c0,44.1-35.7,80-80,80  c-44.3,0-80-35.9-80-80l0,0l0,0c0-44.1,35.7-80,80-80C301.1,176,336.8,211.9,336.8,256L336.8,256z"/></svg>
                </control-button>
              </p>
              <p class="control">
                <control-button title="Credits" colorClass="is-info" @clicked="$parent.$refs.creditsPopup.isActive = true">
                  <svg width="16px" height="16px" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" class="is-light"><g><path d="M345.1,77.1C317.6,56.2,286.6,49,247.3,49c-29.8,0-55.3,6.1-75.5,19.7C142,89,128,123.1,128,177h76.8   c0-14.4-1.4-29.9,7-43.2c8.4-13.3,20.1-23.5,40.2-23.5c20.4,0,30.9,5.9,40.8,18.1c8.4,10.4,11.6,22.8,11.6,36   c0,11.4-5.8,21.9-12.7,31.4c-3.8,5.6-8.8,10.6-15.1,15.4c0,0-41.5,24.7-56.1,48.1c-10.9,17.4-14.8,39.2-15.7,65.3   c-0.1,1.9,0.6,5.8,7.2,5.8c6.5,0,56,0,61.8,0c5.8,0,7-4.4,7.1-6.2c0.4-9.5,1.6-24.1,3.3-29.6c3.3-10.4,9.7-19.5,19.7-27.3   l20.7-14.3c18.7-14.6,33.6-26.5,40.2-35.9c11.3-15.4,19.2-34.4,19.2-56.9C384,123.5,370.5,96.4,345.1,77.1z M242,370.2   c-25.9-0.8-47.3,17.2-48.2,45.3c-0.8,28.2,19.5,46.7,45.5,47.5c27,0.8,47.9-16.6,48.7-44.7C288.8,390.2,269,371,242,370.2z"/></g></svg>
                </control-button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import Stopwatch from './Stopwatch'
import ControlButton from './ControlButton'
import SettingsPopup from './SettingsPopup'
import CreditsPopup from './CreditsPopup'

export default {
  name: 'control-panel',
  components: {
    Stopwatch,
    ControlButton,
    SettingsPopup,
    CreditsPopup
  },
  data () {
    return {
      ticker: null,
      isTicking: null,
      isPause: false
    }
  },
  methods: {
    play: function () {
      this.tick()
      this.ticker = setInterval(this.tick, 1000)
      this.$emit('colored', 'is-success')
    },
    stop: function () {
      clearInterval(this.ticker)
      this.ticker = null
      this.isTicking = false
      this.isPause = true
      this.$emit('colored', 'is-light')
    },
    reset: function () {
      this.stop()
      this.$dialog.confirm({
        title: 'Reset',
        message: 'Are you sure you want to reset your application? (= cancel countdown and restore default state)',
        confirmText: 'OK',
        type: 'is-danger',
        onConfirm: () => {
          this.restore()
        },
        onCancel: () => {
          this.play()
        }
      })
    },
    restore: function () {
      this.$store.commit('reset')
      this.isTicking = null
      this.$emit('colored', 'is-dark')
      this.$emit('pulsed', false)
    },
    tick: function () {
      this.$store.commit('increment')
      this.isTicking = true
      this.isPause = false
      if (this.$store.state.countdownSeconds === 0) {
        this.$emit('colored', 'is-danger')
      } else if (this.$store.state.warningEnabled && this.$store.state.countdownSeconds === this.$store.state.warningSeconds) {
        this.$emit('colored', 'is-warning')
      }
      if (this.$store.state.pulseEnabled && this.$store.state.countdownSeconds === this.$store.state.pulseSeconds) {
        this.$emit('pulsed', true)
      }
    }
  }
}
</script>

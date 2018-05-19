<template>
  <div class="field is-grouped is-hidden-mobile" v-show="fontSizerEnabled">
    <p class="control">
      <control-button title="" :colorClass="$parent.$parent.colorClass" @clicked="zoomIn" :disabled="zoomInEnabled">
        <svg width="20px" height="20px" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" class="font-size" v-bind:class="{ 'is-light': isLightFontColor, 'is-dark': isDarkFontColor }"><path d="M417.4,224H288V94.6c0-16.9-14.3-30.6-32-30.6c-17.7,0-32,13.7-32,30.6V224H94.6C77.7,224,64,238.3,64,256  c0,17.7,13.7,32,30.6,32H224v129.4c0,16.9,14.3,30.6,32,30.6c17.7,0,32-13.7,32-30.6V288h129.4c16.9,0,30.6-14.3,30.6-32  C448,238.3,434.3,224,417.4,224z"/></svg>
      </control-button>
    </p>
    <p class="control">
        <control-button title="" :colorClass="$parent.$parent.colorClass" @clicked="zoomOut" :disabled="zoomOutEnabled">
        <svg width="20px" height="20px" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" class="font-size" v-bind:class="{ 'is-light': isLightFontColor, 'is-dark': isDarkFontColor }"><path d="M417.4,224H94.6C77.7,224,64,238.3,64,256c0,17.7,13.7,32,30.6,32h322.8c16.9,0,30.6-14.3,30.6-32  C448,238.3,434.3,224,417.4,224z"/></svg>
      </control-button>
    </p>
  </div>
</template>

<script>
import ControlButton from './ControlButton'

export default {
  name: 'fontSizer',
  components: {
    ControlButton
  },
  computed: {
    fontSizerEnabled: function () {
      return this.$store.state.fontSizerEnabled
    },
    isLightFontColor: function () {
      return this.$parent.$parent.colorClass !== 'is-light'
    },
    isDarkFontColor: function () {
      return this.$parent.$parent.colorClass === 'is-light'
    },
    zoomInEnabled: function () {
      return this.$store.state.fontSize >= 50
    },
    zoomOutEnabled: function () {
      return this.$store.state.fontSize <= 1
    }
  },
  methods: {
    zoomIn: function () {
      this.$store.commit('zoomIn')
      this.$parent.$parent.$refs.settingsPopup.zoomed()
    },
    zoomOut: function () {
      this.$store.commit('zoomOut')
      this.$parent.$parent.$refs.settingsPopup.zoomed()
    }
  }
}
</script>

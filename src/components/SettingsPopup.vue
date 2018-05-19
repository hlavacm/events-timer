<template>
  <b-modal :active.sync="isActive">
    <form>
      <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">Settings</p>
            <button class="delete close-modal" @click.prevent="isActive = false"></button>
          </header>
          <section class="modal-card-body">
            <b-tabs v-model="currentTabIndex" type="is-toggle-rounded" size="is-medium" expanded>
                <!-- Quick -->
                <b-tab-item label="Quick">
                  <p class="has-text-centered">
                    Try use the one of common times:
                  </p>
                  <hr>
                  <div class="field is-grouped is-grouped-multiline is-grouped-centered">
                    <p class="control"><button class="button is-info is-medium" @click.prevent="applyQuickTime(5)">00:05:00</button></p>
                    <p class="control"><button class="button is-info is-medium" @click.prevent="applyQuickTime(10)">00:10:00</button></p>
                    <p class="control"><button class="button is-info is-medium" @click.prevent="applyQuickTime(15)">00:15:00</button></p>
                    <p class="control"><button class="button is-info is-medium" @click.prevent="applyQuickTime(20)">00:20:00</button></p>
                  </div>
                  <hr>
                  <div class="field is-grouped is-grouped-multiline is-grouped-centered">
                    <p class="control"><button class="button is-info is-medium" @click.prevent="applyQuickTime(30)">00:30:00</button></p>
                    <p class="control"><button class="button is-info is-medium" @click.prevent="applyQuickTime(40)">00:40:00</button></p>
                    <p class="control"><button class="button is-info is-medium" @click.prevent="applyQuickTime(45)">00:45:00</button></p>
                    <p class="control"><button class="button is-info is-medium" @click.prevent="applyQuickTime(50)">00:50:00</button></p>
                  </div>
                </b-tab-item>
                <!-- Custom -->
                <b-tab-item label="Custom">
                  <b-field label="Countdown Time" message="Min. 00:01:00 and max. 00:59:59 or 23:59:59 by the current format">
                    <p class="control">
                      <input type="time" v-model="countdownTimeValue" placeholder="Time" min="00:00" max="23:59:59" step="300" class="input is-medium is-rounded" @change.prevent="countdownChanged" required>
                    </p>
                  </b-field>
                  <b-field label="Warning Time (of the Countdown)">
                    <div class="columns">
                      <div class="column">
                        <p class="control">
                          <input type="time" v-model="warningTimeValue" placeholder="Time" min="00:00" max="23:59:59" step="5" class="input is-medium is-rounded" @change.prevent="warningTimeChanged" :disabled="!warningEnabled" required>
                        </p>
                      </div>
                      <div class="column">
                        <p class="control has-icons-right">
                          <input type="number" v-model="warningPercentageValue" min="0" max="100" class="input is-medium is-rounded" placeholder="Percentage" @change.prevent="warningPercentageChanged" :disabled="!warningEnabled" required>
                          <span class="icon is-right">%</span>
                        </p>
                      </div>
                    </div>
                  </b-field>
                  <b-field label="Pulse Time (of the Countdown)">
                    <div class="columns">
                      <div class="column">
                        <p class="control">
                          <input type="time" v-model="pulseTimeValue" placeholder="Time" min="00:00" max="23:59:59" step="5" class="input is-medium is-rounded" @change.prevent="pulseTimeChanged" :disabled="!pulseEnabled" required>
                        </p>
                      </div>
                      <div class="column">
                        <div class="control has-icons-right">
                          <input type="number" v-model="pulsePercentageValue" min="0" max="100" placeholder="Percentage" class="input is-medium is-rounded" @change.prevent="pulsePercentageChanged" :disabled="!pulseEnabled" required>
                          <span class="icon is-right">%</span>
                        </div>
                      </div>
                    </div>
                  </b-field>
                </b-tab-item>
                <!-- Advanced -->
                <b-tab-item label="Advanced">
                  <b-field label="Time Format">
                    <div class="field is-grouped is-grouped-multiline">
                      <p class="control">
                        <b-tooltip label="Countdown long time format with seconds" position="is-bottom" size="is-small" type="is-info" multilined>
                          <b-radio-button v-model="currentFormatValue" native-value="HH:mm:ss" size="is-medium" type="is-info">
                              <span>HH:mm:ss</span>
                          </b-radio-button>
                        </b-tooltip>
                      </p>
                      <p class="control">
                        <b-tooltip label="Countdown short time format without seconds" position="is-bottom" size="is-small" type="is-info" multilined>
                          <b-radio-button v-model="currentFormatValue" native-value="mm:ss" size="is-medium" type="is-info">
                              <span>mm:ss</span>
                          </b-radio-button>
                        </b-tooltip>
                      </p>
                    </div>
                  </b-field>
                  <b-field label="Font Size">
                    <div class="columns">
                      <div class="column is-8">
                        <b-tooltip label="Countdown font size in VW" position="is-bottom" size="is-small" type="is-info" multilined>
                          <div class="control has-icons-right">
                            <input type="number" v-model="fontSizeValue" min="1" max="50" placeholder="Font Size" class="input is-medium is-rounded" required>
                            <span class="icon is-right">vw</span>
                          </div>
                        </b-tooltip>
                      </div>
                      <div class="column is-one-quarter">
                        <div class="field is-4">
                          <b-tooltip label="Font Size +/- buttons in the top-left corner" position="is-bottom" size="is-small" type="is-info" multilined>
                            <b-switch v-model="fontSizerEnabled" size="is-medium" type="is-info">Sizer</b-switch>
                          </b-tooltip>
                        </div>
                      </div>
                    </div>
                  </b-field>
                  <b-field label="Visual Notification">
                    <div class="columns">
                      <div class="column is-4">
                        <div class="field">
                          <b-tooltip label="Orange background after the Warning time" size="is-small" type="is-info" multilined>
                            <b-switch v-model="warningEnabled" size="is-medium" type="is-info">Warning</b-switch>
                          </b-tooltip>
                        </div>
                      </div>
                      <div class="column">
                        <div class="field is-4">
                          <b-tooltip label="Countdown pulsing after the Pulse time" size="is-small" type="is-info" multilined>
                            <b-switch v-model="pulseEnabled" size="is-medium" type="is-info">Pulse</b-switch>
                          </b-tooltip>
                        </div>
                      </div>
                      <div class="column is-4">
                        <div class="field">
                          <b-tooltip label="Elapsed time in the top-left corner" size="is-small" type="is-info" multilined>
                            <b-switch v-model="stopwatchEnabled" size="is-medium" type="is-info">Elapsed</b-switch>
                          </b-tooltip>
                        </div>
                      </div>
                    </div>
                  </b-field>
                </b-tab-item>
            </b-tabs>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-success" @click.prevent="applySettings">Apply</button>
            <button class="button" @click.prevent="isActive = false">Storno</button>
          </footer>
      </div>
    </form>
  </b-modal>
</template>

<script>
import moment from 'moment'
import { LONG_TIME_FORMAT, SHORT_TIME_FORMAT, getMaxCurrentSeconds } from './../shared.js'

export default {
  name: 'settings-popup',
  data () {
    return {
      isActive: false,
      currentTabIndex: this.$store.state.lastSettingsTabIndex,
      countdownTime: this.$store.getters.countdownLongTime,
      stopwatchEnabled: this.$store.state.stopwatchEnabled,
      warningTime: this.$store.getters.warningLongTime,
      warningPercentage: null,
      warningEnabled: this.$store.state.warningEnabled,
      pulseTime: this.$store.getters.pulseLongTime,
      pulsePercentage: null,
      pulseEnabled: this.$store.state.pulseEnabled,
      currentFormat: this.$store.state.currentFormat,
      fontSize: this.$store.state.fontSize,
      fontSizerEnabled: this.$store.state.fontSizerEnabled
    }
  },
  computed: {
    countdownTimeValue: {
      get: function () { return this.normalizeTimeValue(this.countdownTime, 60, getMaxCurrentSeconds(this.currentFormatValue)) },
      set: function (value) { this.countdownTime = this.normalizeTimeValue(value, 60, getMaxCurrentSeconds(this.currentFormatValue)) }
    },
    warningTimeValue: {
      get: function () { return this.normalizeTimeValue(this.warningTime, 0, this.getTimeSeconds(this.countdownTimeValue)) },
      set: function (value) { this.warningTime = this.normalizeTimeValue(value, 0, this.getTimeSeconds(this.countdownTimeValue)) }
    },
    warningPercentageValue: {
      get: function () { return this.normalizeNumberValue(this.warningPercentage, 0, 100) },
      set: function (value) { this.warningPercentage = this.normalizeNumberValue(value, 0, 100) }
    },
    pulseTimeValue: {
      get: function () { return this.normalizeTimeValue(this.pulseTime, 0, this.getTimeSeconds(this.countdownTimeValue)) },
      set: function (value) { this.pulseTime = this.normalizeTimeValue(value, 0, this.getTimeSeconds(this.countdownTimeValue)) }
    },
    pulsePercentageValue: {
      get: function () { return this.normalizeNumberValue(this.pulsePercentage, 0, 100) },
      set: function (value) { this.pulsePercentage = this.normalizeNumberValue(value, 0, 100) }
    },
    currentFormatValue: {
      get: function () { return this.normalizeStringValue(this.currentFormat, [LONG_TIME_FORMAT, SHORT_TIME_FORMAT]) },
      set: function (value) { this.currentFormat = this.normalizeStringValue(value, [LONG_TIME_FORMAT, SHORT_TIME_FORMAT]) }
    },
    fontSizeValue: {
      get: function () { return this.normalizeNumberValue(this.fontSize, 1, 50) },
      set: function (value) { this.fontSize = this.normalizeNumberValue(parseInt(value), 1, 50) }
    }
  },
  mounted: function () {
    this.warningPercentageValue = this.getPercentageByTime(this.countdownTimeValue, this.warningTimeValue)
    this.pulsePercentageValue = this.getPercentageByTime(this.countdownTimeValue, this.pulseTimeValue)
  },
  methods: {
    countdownChanged: function () {
      this.warningPercentageChanged()
      this.pulsePercentageChanged()
    },
    warningPercentageChanged: function () {
      this.warningTimeValue = this.getTimeByPercentage(this.countdownTimeValue, this.warningPercentageValue)
    },
    warningTimeChanged: function () {
      this.warningPercentageValue = this.getPercentageByTime(this.countdownTimeValue, this.warningTimeValue)
    },
    pulsePercentageChanged: function () {
      this.pulseTimeValue = this.getTimeByPercentage(this.countdownTimeValue, this.pulsePercentageValue)
    },
    pulseTimeChanged: function () {
      this.pulsePercentageValue = this.getPercentageByTime(this.countdownTimeValue, this.pulseTimeValue)
    },
    getTimeByPercentage: function (baseTime, percentage) {
      let baseSeconds = this.getTimeSeconds(baseTime)
      let currentSeconds = Math.round((baseSeconds / 100) * percentage)
      return moment.utc(currentSeconds * 1000).format(LONG_TIME_FORMAT)
    },
    getPercentageByTime: function (baseTime, currentTime) {
      let baseSeconds = this.getTimeSeconds(baseTime)
      let currentSeconds = this.getTimeSeconds(currentTime)
      return Math.round(currentSeconds / (baseSeconds / 100))
    },
    getTimeSeconds: function (time) {
      let date = moment.utc(time, LONG_TIME_FORMAT)
      return (date.hours() * 3600) + (date.minutes() * 60) + date.seconds()
    },
    applyQuickTime: function (minutes) {
      this.countdownTime = moment.utc(minutes * 60 * 1000).format(LONG_TIME_FORMAT)
      this.warningPercentageValue = 10
      this.pulsePercentageValue = 5
      this.countdownChanged()
      this.applySettings()
    },
    applySettings: function () {
      this.$dialog.confirm({
        title: 'Apply Settings',
        message: 'Changes in settings will reset your application. Do you want to continue?',
        confirmText: 'OK',
        type: 'is-danger',
        onConfirm: () => {
          this.$parent.$refs.controlPanel.stop()
          let state = {
            lastSettingsTabIndex: this.currentTabIndex,
            baseSeconds: this.getTimeSeconds(this.countdownTimeValue),
            stopwatchEnabled: this.stopwatchEnabled,
            warningSeconds: this.getTimeSeconds(this.warningTimeValue),
            warningEnabled: this.warningEnabled,
            pulseSeconds: this.getTimeSeconds(this.pulseTimeValue),
            pulseEnabled: this.pulseEnabled,
            currentFormat: this.currentFormatValue,
            fontSize: this.fontSizeValue,
            fontSizerEnabled: this.fontSizerEnabled
          }
          for (var key in state) {
            localStorage.setItem(key, btoa(state[key]))
          }
          this.$store.commit('update', state)
          this.$parent.$refs.controlPanel.restore()
          this.isActive = false
        },
        onCancel: () => {
          this.isActive = false
        }
      })
    },
    normalizeNumberValue: function (value, min, max) {
      if (value < min) {
        return min
      }
      if (value > max) {
        return max
      }
      return value
    },
    normalizeStringValue: function (value, matches) {
      if (matches.includes(value)) {
        return value
      }
      return matches[0]
    },
    normalizeTimeValue: function (time, minSeconds, maxSeconds) {
      let value = this.getTimeSeconds(time)
      if (value < minSeconds) {
        return moment.utc(minSeconds * 1000).format(LONG_TIME_FORMAT)
      }
      if (value > maxSeconds) {
        return moment.utc(maxSeconds * 1000).format(LONG_TIME_FORMAT)
      }
      return time
    },
    zoomed: function () {
      this.fontSize = this.$store.state.fontSize
    }
  }
}
</script>

<style scoped>
.modal-card-body { min-height: 425px; }
.modal-card-foot { justify-content: space-between; }
input[type=text]::-ms-clear {  display: none; width : 0; height: 0; }
input[type=text]::-ms-reveal {  display: none; width : 0; height: 0; }
input[type="time"]::-webkit-search-decoration,
input[type="time"]::-webkit-search-cancel-button,
input[type="time"]::-webkit-search-results-button,
input[type="time"]::-webkit-search-results-decoration { display: none; }
</style>

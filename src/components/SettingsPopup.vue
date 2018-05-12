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
                    <p class="control"><button class="button is-info is-large" @click.prevent="applyQuickTime(5)">05:00</button></p>
                    <p class="control"><button class="button is-info is-large" @click.prevent="applyQuickTime(10)">10:00</button></p>
                    <p class="control"><button class="button is-info is-large" @click.prevent="applyQuickTime(15)">15:00</button></p>
                    <p class="control"><button class="button is-info is-large" @click.prevent="applyQuickTime(20)">20:00</button></p>
                  </div>
                  <hr>
                  <div class="field is-grouped is-grouped-multiline is-grouped-centered">
                    <p class="control"><button class="button is-info is-large" @click.prevent="applyQuickTime(30)">30:00</button></p>
                    <p class="control"><button class="button is-info is-large" @click.prevent="applyQuickTime(40)">40:00</button></p>
                    <p class="control"><button class="button is-info is-large" @click.prevent="applyQuickTime(45)">45:00</button></p>
                    <p class="control"><button class="button is-info is-large" @click.prevent="applyQuickTime(50)">50:00</button></p>
                  </div>
                </b-tab-item>
                <!-- Custom -->
                <b-tab-item label="Custom">
                  <b-field label="Countdown Time">
                    <p class="control">
                      <input type="time" v-model="countdownTimeValue" placeholder="Time" class="input is-medium is-rounded" @change.prevent="countdownChanged" required>
                    </p>
                  </b-field>
                  <b-field label="Warning Time">
                    <div class="columns">
                      <div class="column">
                        <p class="control">
                          <input type="time" v-model="warningTimeValue" placeholder="Time" class="input is-medium is-rounded" @change.prevent="warningTimeChanged" :disabled="!warningEnabled" required>
                        </p>
                      </div>
                      <div class="column">
                        <div class="control has-icons-right">
                          <input size="30" type="number" v-model="warningPercentageValue" min="0" max="100" class="input is-medium is-rounded" placeholder="Percentage" @change.prevent="warningPercentageChanged" :disabled="!warningEnabled" required>
                          <span class="icon is-right">%</span>
                        </div>
                      </div>
                    </div>
                  </b-field>
                  <b-field label="Pulse Time">
                    <div class="columns">
                      <div class="column">
                        <p class="control">
                          <input type="time" v-model="pulseTimeValue" placeholder="Time" class="input is-medium is-rounded" @change.prevent="pulseTimeChanged" :disabled="!pulseEnabled" required>
                        </p>
                      </div>
                      <div class="column">
                        <div class="control has-icons-right">
                          <input size="30" type="number" v-model="pulsePercentageValue" min="0" max="100" placeholder="Percentage" class="input is-medium is-rounded" @change.prevent="pulsePercentageChanged" :disabled="!pulseEnabled" required>
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
                        <b-radio-button v-model="currentFormatValue" native-value="HH:mm:ss" type="is-info" size="is-medium">
                            <span>HH:mm:ss</span>
                        </b-radio-button>
                      </p>
                      <p class="control">
                        <b-radio-button v-model="currentFormatValue" native-value="mm:ss" type="is-info" size="is-medium">
                            <span>mm:ss</span>
                        </b-radio-button>
                      </p>
                    </div>
                  </b-field>
                  <b-field label="Font Size">
                    <div class="control has-icons-right">
                      <input type="number" v-model="fontSizeValue" min="1" max="50" placeholder="Font Size" class="input is-medium is-rounded" required>
                      <span class="icon is-right">vw</span>
                    </div>
                  </b-field>
                  <b-field label="Visual Notification">
                    <div class="columns">
                      <div class="column">
                        <div class="field">
                          <b-switch v-model="warningEnabled" size="is-medium" type="is-info">Warning</b-switch>
                        </div>
                      </div>
                      <div class="column">
                        <div class="field">
                          <b-switch v-model="pulseEnabled" size="is-medium" type="is-info">Pulse</b-switch>
                        </div>
                      </div>
                      <div class="column">
                        <div class="field">
                          <b-switch v-model="stopwatchEnabled" size="is-medium" type="is-info">Elapsed</b-switch>
                        </div>
                      </div>
                    </div>
                  </b-field>
                </b-tab-item>
            </b-tabs>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-success" @click.prevent="isActive = false">Apply</button>
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
      fontSize: this.$store.state.fontSize
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
      get: function () { return this.normalizeNumberValue(this.warningPercentage, 0, this.getTimeSeconds(this.countdownTimeValue)) },
      set: function (value) { this.warningPercentage = this.normalizeNumberValue(value, 0, this.getTimeSeconds(this.countdownTimeValue)) }
    },
    pulseTimeValue: {
      get: function () { return this.normalizeTimeValue(this.pulseTime, 0, 100) },
      set: function (value) { this.pulseTime = this.normalizeTimeValue(value, 0, 100) }
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
      set: function (value) { this.fontSize = this.normalizeNumberValue(value, 1, 50) }
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
      this.currentTabIndex = 1
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
      console.log(['time', time])
      let value = this.getTimeSeconds(time)
      console.log({
        time: time,
        minSeconds: minSeconds,
        maxSeconds: maxSeconds,
        value: value
      })
      if (value < minSeconds) {
        return moment.utc(minSeconds * 1000).format(LONG_TIME_FORMAT)
      }
      if (value > maxSeconds) {
        return moment.utc(maxSeconds * 1000).format(LONG_TIME_FORMAT)
      }
      return time
    }
  }
}
</script>

<style scoped>
.modal-card-body { min-height: 405px; }
.modal-card-foot { justify-content: space-between; }
input[type=text]::-ms-clear {  display: none; width : 0; height: 0; }
input[type=text]::-ms-reveal {  display: none; width : 0; height: 0; }
input[type="time"]::-webkit-search-decoration,
input[type="time"]::-webkit-search-cancel-button,
input[type="time"]::-webkit-search-results-button,
input[type="time"]::-webkit-search-results-decoration { display: none; }
</style>

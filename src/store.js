import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import { LONG_TIME_FORMAT, DEFAULT_FONT_SIZE, getMaxCurrentSeconds } from './shared.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    lastSettingsTabIndex: 1,
    countdownSeconds: 60,
    stopwatchSeconds: 0,
    stopwatchEnabled: true,
    warningSeconds: 6,
    warningEnabled: true,
    pulseSeconds: 3,
    pulseEnabled: true,
    currentFormat: LONG_TIME_FORMAT,
    fontSize: DEFAULT_FONT_SIZE
  },
  mutations: {
    increment (state) {
      let maxCurrentSeconds = getMaxCurrentSeconds(state.currentFormat)
      if (state.stopwatchSeconds < maxCurrentSeconds) {
        state.countdownSeconds--
        state.stopwatchSeconds++
      }
    },
    reset (state) {
      state.countdownSeconds = 10
      state.stopwatchSeconds = 0
    }
  },
  getters: {
    countdownTime: state => {
      if (state.countdownSeconds < 0) {
        let value = moment.utc(state.countdownSeconds * 1000 * -1).format(state.currentFormat)
        return `-${value}`
      }
      return moment.utc(state.countdownSeconds * 1000).format(state.currentFormat)
    },
    countdownLongTime: state => {
      return moment.utc(state.countdownSeconds * 1000).format(LONG_TIME_FORMAT)
    },
    stopwatchTime: state => {
      return moment.utc(state.stopwatchSeconds * 1000).format(state.currentFormat)
    },
    warningTime: state => {
      return moment.utc(state.warningSeconds * 1000).format(state.currentFormat)
    },
    warningLongTime: state => {
      return moment.utc(state.warningSeconds * 1000).format(LONG_TIME_FORMAT)
    },
    pulseTime: state => {
      return moment.utc(state.pulseSeconds * 1000).format(state.currentFormat)
    },
    pulseLongTime: state => {
      return moment.utc(state.pulseSeconds * 1000).format(LONG_TIME_FORMAT)
    },
    maxCurrentSeconds: state => {
      return moment.utc(state.pulseSeconds * 1000).format(LONG_TIME_FORMAT)
    }
  }
})

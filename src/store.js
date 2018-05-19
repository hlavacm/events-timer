import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import { LONG_TIME_FORMAT, DEFAULT_FONT_SIZE, MAX_LONG_TIME_VALUE, MAX_SHORT_TIME_VALUE } from './shared.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    lastSettingsTabIndex: tryInitializeValue('lastSettingsTabIndex', 1, (value) => { return parseInt(value) }),
    baseSeconds: tryInitializeValue('baseSeconds', 1800, (value) => { return parseInt(value) }),
    countdownSeconds: tryInitializeValue('baseSeconds', 1800, (value) => { return parseInt(value) }),
    stopwatchSeconds: 0,
    stopwatchEnabled: tryInitializeValue('stopwatchEnabled', true, (value) => { return value === 'true' }),
    warningSeconds: tryInitializeValue('warningSeconds', 180, (value) => { return parseInt(value) }),
    warningEnabled: tryInitializeValue('warningEnabled', true, (value) => { return value === 'true' }),
    pulseSeconds: tryInitializeValue('pulseSeconds', 90, (value) => { return parseInt(value) }),
    pulseEnabled: tryInitializeValue('pulseEnabled', true, (value) => { return value === 'true' }),
    currentFormat: tryInitializeValue('currentFormat', LONG_TIME_FORMAT),
    fontSize: tryInitializeValue('fontSize', DEFAULT_FONT_SIZE, (value) => { return parseInt(value) }),
    fontSizerEnabled: tryInitializeValue('fontSizerEnabled', true, (value) => { return value === 'true' })
  },
  mutations: {
    increment (state) {
      if (state.stopwatchSeconds < MAX_LONG_TIME_VALUE) {
        state.countdownSeconds--
        state.stopwatchSeconds++
      }
    },
    reset (state) {
      state.countdownSeconds = state.baseSeconds
      state.stopwatchSeconds = 0
    },
    update (state, settings) {
      state.lastSettingsTabIndex = settings.lastSettingsTabIndex
      state.baseSeconds = settings.baseSeconds
      state.stopwatchEnabled = settings.stopwatchEnabled
      state.warningSeconds = settings.warningSeconds
      state.warningEnabled = settings.warningEnabled
      state.pulseSeconds = settings.pulseSeconds
      state.pulseEnabled = settings.pulseEnabled
      state.currentFormat = settings.currentFormat
      state.fontSize = settings.fontSize
      state.fontSizerEnabled = settings.fontSizerEnabled
    },
    zoomIn (state) {
      state.fontSize = state.fontSize + 1
    },
    zoomOut (state) {
      state.fontSize = state.fontSize - 1
    }
  },
  getters: {
    countdownTime: state => {
      if (state.countdownSeconds < 0) {
        let format = (state.countdownSeconds < -MAX_SHORT_TIME_VALUE) ? LONG_TIME_FORMAT : state.currentFormat
        let value = moment.utc(state.countdownSeconds * 1000 * -1).format(format)
        return `-${value}`
      }
      return moment.utc(state.countdownSeconds * 1000).format(state.currentFormat)
    },
    countdownLongTime: state => {
      return moment.utc(state.countdownSeconds * 1000).format(LONG_TIME_FORMAT)
    },
    stopwatchTime: state => {
      let format = (state.stopwatchSeconds > MAX_SHORT_TIME_VALUE) ? LONG_TIME_FORMAT : state.currentFormat
      return moment.utc(state.stopwatchSeconds * 1000).format(format)
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

function tryInitializeValue (storageKey, defaultValue, filterFunction) {
  let storageValue = localStorage.getItem(storageKey)
  if (storageValue) {
    let pureStorageValue = atob(storageValue)
    if (filterFunction) {
      return filterFunction(pureStorageValue)
    }
    return pureStorageValue
  }
  return defaultValue
}

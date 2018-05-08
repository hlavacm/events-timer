import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

Vue.use(Vuex)

const LONG_TIME_FORMAT = 'HH:mm:ss'
const SHORT_TIME_FORMAT = 'mm:ss'
const MAX_LONG_TIME_VALUE = 86399 // 23:59:59
const MAX_SHORT_TIME_VALUE = 3599 // 59:59

export const store = new Vuex.Store({
  state: {
    countdown: 10,
    stopwatch: 0,
    currentFormat: SHORT_TIME_FORMAT
  },
  mutations: {
    increment (state) {
      let maxCurrentTimeValue
      switch (state.currentFormat) {
        case LONG_TIME_FORMAT:
          maxCurrentTimeValue = MAX_LONG_TIME_VALUE
          break
        case SHORT_TIME_FORMAT:
          maxCurrentTimeValue = MAX_SHORT_TIME_VALUE
          break
      }
      if (state.stopwatch < maxCurrentTimeValue) {
        state.countdown--
        state.stopwatch++
      }
    },
    reset (state) {
      state.countdown = 10
      state.stopwatch = 0
    }
  },
  getters: {
    countdownTime: state => {
      if (state.countdown < 0) {
        let value = moment.utc(state.countdown * 1000 * -1).format(state.currentFormat)
        return `-${value}`
      }
      return moment.utc(state.countdown * 1000).format(state.currentFormat)
    },
    stopwatchTime: state => {
      return moment.utc(state.stopwatch * 1000).format(state.currentFormat)
    }
  }
})

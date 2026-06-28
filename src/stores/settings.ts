import { defineStore } from 'pinia'
import type { TimerSettings } from '@/types/timer'
import { loadSettings, saveSettings } from '@/utils/storage'
import {
  formatAbsoluteSeconds,
  LONG_TIME_FORMAT
} from '@/utils/time'

export const useSettingsStore = defineStore('settings', {
  state: (): TimerSettings => loadSettings(),

  getters: {
    countdownTime (state): string {
      return formatAbsoluteSeconds(state.baseSeconds, LONG_TIME_FORMAT)
    },
    warningLongTime (state): string {
      return formatAbsoluteSeconds(state.warningSeconds, LONG_TIME_FORMAT)
    },
    pulseLongTime (state): string {
      return formatAbsoluteSeconds(state.pulseSeconds, LONG_TIME_FORMAT)
    },
    warningTime (state): string {
      return formatAbsoluteSeconds(state.warningSeconds, state.currentFormat)
    },
    pulseTime (state): string {
      return formatAbsoluteSeconds(state.pulseSeconds, state.currentFormat)
    }
  },

  actions: {
    patchSettings (partial: Partial<TimerSettings>) {
      Object.assign(this.$state, partial)
    },

    replaceSettings (settings: TimerSettings) {
      Object.assign(this.$state, settings)
      saveSettings(this.$state)
    },

    persist () {
      saveSettings(this.$state)
    }
  }
})

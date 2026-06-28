import { defineStore } from 'pinia'
import type { TimerSettings, TimerStatus, VisualState } from '@/types/timer'
import { useSettingsStore } from '@/stores/settings'
import {
  formatCountdownDisplay,
  formatStopwatchDisplay,
  MAX_FONT_SIZE,
  MAX_LONG_TIME_VALUE,
  MIN_FONT_SIZE
} from '@/utils/time'

let ticker: ReturnType<typeof setInterval> | null = null
let runningStartedAt = 0
let countdownAtStart = 0
let stopwatchAtStart = 0

function clearTicker (): void {
  if (ticker !== null) {
    clearInterval(ticker)
    ticker = null
  }
}

function getElapsedSeconds (): number {
  return Math.max(0, Math.floor((Date.now() - runningStartedAt) / 1000))
}

export const useTimerStore = defineStore('timer', {
  state: () => {
    const settings = useSettingsStore()
    return {
      countdownSeconds: settings.baseSeconds,
      stopwatchSeconds: 0,
      status: 'idle' as TimerStatus,
      pulseActive: false,
      visualState: 'idle' as VisualState
    }
  },

  getters: {
    countdownTime (): string {
      const settings = useSettingsStore()
      return formatCountdownDisplay(
        this.countdownSeconds,
        settings.currentFormat
      )
    },

    stopwatchTime (): string {
      const settings = useSettingsStore()
      return formatStopwatchDisplay(
        this.stopwatchSeconds,
        settings.currentFormat
      )
    },

    isRunning (): boolean {
      return this.status === 'running'
    },

    isIdle (): boolean {
      return this.status === 'idle'
    },

    canStart (): boolean {
      return this.status !== 'running'
    },

    canPause (): boolean {
      return this.status === 'running'
    },

    canReset (): boolean {
      return this.status !== 'idle'
    }
  },

  actions: {
    start () {
      if (this.status === 'running') {
        return
      }
      clearTicker()
      this.countdownSeconds--
      this.stopwatchSeconds = Math.min(
        this.stopwatchSeconds + 1,
        MAX_LONG_TIME_VALUE
      )
      this.status = 'running'
      runningStartedAt = Date.now()
      countdownAtStart = this.countdownSeconds
      stopwatchAtStart = this.stopwatchSeconds
      this.refreshFromClock()
      ticker = setInterval(() => this.refreshFromClock(), 1000)
    },

    pause () {
      if (this.status === 'running') {
        this.refreshFromClock()
      }
      clearTicker()
      this.status = 'paused'
      this.visualState = 'paused'
    },

    toggle () {
      if (this.status === 'running') {
        this.pause()
      } else {
        this.start()
      }
    },

    restoreAfterReset () {
      const settings = useSettingsStore()
      this.countdownSeconds = settings.baseSeconds
      this.stopwatchSeconds = 0
      this.status = 'idle'
      this.pulseActive = false
      this.visualState = 'idle'
    },

    completeReset () {
      clearTicker()
      this.restoreAfterReset()
    },

    tick () {
      this.countdownSeconds--
      this.stopwatchSeconds = Math.min(
        this.stopwatchSeconds + 1,
        MAX_LONG_TIME_VALUE
      )
      this.status = 'running'
      this.updateVisualState()
    },

    refreshFromClock () {
      const elapsedSeconds = getElapsedSeconds()
      const availableSeconds = MAX_LONG_TIME_VALUE - stopwatchAtStart
      const appliedElapsedSeconds = Math.min(elapsedSeconds, availableSeconds)
      this.countdownSeconds = countdownAtStart - appliedElapsedSeconds
      this.stopwatchSeconds = stopwatchAtStart + appliedElapsedSeconds
      this.status = 'running'
      this.updateVisualState()
    },

    updateVisualState () {
      const settings = useSettingsStore()

      if (this.countdownSeconds <= 0) {
        this.visualState = 'danger'
      } else if (
        settings.warningEnabled &&
        this.countdownSeconds <= settings.warningSeconds
      ) {
        this.visualState = 'warning'
      } else {
        this.visualState = 'running'
      }

      if (
        settings.pulseEnabled &&
        this.countdownSeconds <= settings.pulseSeconds
      ) {
        this.pulseActive = true
      }
    },

    applySettings (settings: TimerSettings) {
      clearTicker()
      const settingsStore = useSettingsStore()
      settingsStore.replaceSettings(settings)
      this.restoreAfterReset()
    },

    zoomIn () {
      const settings = useSettingsStore()
      if (settings.fontSize < MAX_FONT_SIZE) {
        settings.patchSettings({ fontSize: settings.fontSize + 1 })
      }
    },

    zoomOut () {
      const settings = useSettingsStore()
      if (settings.fontSize > MIN_FONT_SIZE) {
        settings.patchSettings({ fontSize: settings.fontSize - 1 })
      }
    }
  }
})

export function resetTimerStoreForTests (): void {
  clearTicker()
  runningStartedAt = 0
  countdownAtStart = 0
  stopwatchAtStart = 0
}

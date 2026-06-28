import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useSettingsStore } from '@/stores/settings'
import { resetTimerStoreForTests, useTimerStore } from '@/stores/timer'
import { DEFAULT_SETTINGS } from '@/utils/storage'
import { MAX_FONT_SIZE, MAX_LONG_TIME_VALUE, MIN_FONT_SIZE } from '@/utils/time'
import { setupPinia } from '../helpers/pinia'

describe('timer store', () => {
  beforeEach(() => {
    resetTimerStoreForTests()
    setupPinia()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('starts idle with configured countdown', () => {
    const timerStore = useTimerStore()
    const settingsStore = useSettingsStore()
    expect(timerStore.countdownSeconds).toBe(settingsStore.baseSeconds)
    expect(timerStore.status).toBe('idle')
    expect(timerStore.visualState).toBe('idle')
    expect(timerStore.isIdle).toBe(true)
    expect(timerStore.canStart).toBe(true)
    expect(timerStore.canPause).toBe(false)
    expect(timerStore.canReset).toBe(false)
  })

  it('formats countdown and stopwatch getters', () => {
    const settingsStore = useSettingsStore()
    settingsStore.$patch({ currentFormat: 'mm:ss' })
    const timerStore = useTimerStore()
    timerStore.$patch({ countdownSeconds: 125, stopwatchSeconds: 125 })

    expect(timerStore.countdownTime).toBe('02:05')
    expect(timerStore.stopwatchTime).toBe('02:05')
  })

  it('transitions through running, warning, danger, and paused states', () => {
    const settingsStore = useSettingsStore()
    settingsStore.$patch({
      baseSeconds: 4,
      warningSeconds: 2,
      pulseSeconds: 1,
      warningEnabled: true,
      pulseEnabled: true
    })

    const timerStore = useTimerStore()
    timerStore.$patch({ countdownSeconds: 4 })

    timerStore.start()
    expect(timerStore.status).toBe('running')
    expect(timerStore.isRunning).toBe(true)
    expect(timerStore.countdownSeconds).toBe(3)
    expect(timerStore.visualState).toBe('running')

    timerStore.tick()
    expect(timerStore.countdownSeconds).toBe(2)
    expect(timerStore.visualState).toBe('warning')

    timerStore.tick()
    expect(timerStore.countdownSeconds).toBe(1)
    expect(timerStore.pulseActive).toBe(true)

    timerStore.tick()
    expect(timerStore.countdownSeconds).toBe(0)
    expect(timerStore.visualState).toBe('danger')

    timerStore.pause()
    expect(timerStore.status).toBe('paused')
    expect(timerStore.visualState).toBe('paused')
  })

  it('keeps running visual state when warning is disabled', () => {
    const settingsStore = useSettingsStore()
    settingsStore.$patch({
      baseSeconds: 4,
      warningSeconds: 2,
      warningEnabled: false
    })

    const timerStore = useTimerStore()
    timerStore.$patch({ countdownSeconds: 2 })
    timerStore.start()

    expect(timerStore.visualState).toBe('running')
  })

  it('toggles between running and paused', () => {
    const timerStore = useTimerStore()
    timerStore.toggle()
    expect(timerStore.status).toBe('running')

    timerStore.toggle()
    expect(timerStore.status).toBe('paused')
  })

  it('ignores duplicate start calls while running', () => {
    const timerStore = useTimerStore()
    timerStore.start()
    timerStore.$patch({ countdownSeconds: 42 })
    timerStore.start()

    expect(timerStore.status).toBe('running')
    expect(timerStore.countdownSeconds).toBe(42)
  })

  it('resets countdown and stopwatch', () => {
    const timerStore = useTimerStore()
    timerStore.$patch({
      countdownSeconds: 10,
      stopwatchSeconds: 5,
      status: 'paused',
      visualState: 'paused',
      pulseActive: true
    })

    timerStore.completeReset()

    expect(timerStore.countdownSeconds).toBe(useSettingsStore().baseSeconds)
    expect(timerStore.stopwatchSeconds).toBe(0)
    expect(timerStore.status).toBe('idle')
    expect(timerStore.visualState).toBe('idle')
    expect(timerStore.pulseActive).toBe(false)
  })

  it('applies settings and restores idle state', () => {
    const timerStore = useTimerStore()
    timerStore.$patch({ countdownSeconds: 10, status: 'paused' })

    timerStore.applySettings({
      ...DEFAULT_SETTINGS,
      baseSeconds: 300,
      lastSettingsTabIndex: 0
    })

    expect(useSettingsStore().baseSeconds).toBe(300)
    expect(timerStore.countdownSeconds).toBe(300)
    expect(timerStore.status).toBe('idle')
  })

  it('zooms font size within limits', () => {
    const settingsStore = useSettingsStore()
    settingsStore.$patch({ fontSize: MIN_FONT_SIZE })
    const timerStore = useTimerStore()

    timerStore.zoomOut()
    expect(settingsStore.fontSize).toBe(MIN_FONT_SIZE)

    settingsStore.$patch({ fontSize: MAX_FONT_SIZE })
    timerStore.zoomIn()
    expect(settingsStore.fontSize).toBe(MAX_FONT_SIZE)

    settingsStore.$patch({ fontSize: 20 })
    timerStore.zoomIn()
    timerStore.zoomOut()
    expect(settingsStore.fontSize).toBe(20)
  })

  it('stops ticking at the maximum long time value', () => {
    const settingsStore = useSettingsStore()
    settingsStore.$patch({ baseSeconds: MAX_LONG_TIME_VALUE })
    const timerStore = useTimerStore()
    timerStore.$patch({
      countdownSeconds: MAX_LONG_TIME_VALUE,
      stopwatchSeconds: MAX_LONG_TIME_VALUE - 1
    })

    timerStore.tick()

    expect(timerStore.countdownSeconds).toBe(MAX_LONG_TIME_VALUE - 1)
    expect(timerStore.stopwatchSeconds).toBe(MAX_LONG_TIME_VALUE)
  })

  it('keeps countdown aligned with elapsed clock time when interval callbacks are delayed', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-01T00:00:00Z'))

    const settingsStore = useSettingsStore()
    settingsStore.$patch({ baseSeconds: 30, warningSeconds: 10 })
    const timerStore = useTimerStore()
    timerStore.$patch({ countdownSeconds: 30 })

    timerStore.start()
    expect(timerStore.countdownSeconds).toBe(29)

    vi.advanceTimersByTime(5000)

    expect(timerStore.countdownSeconds).toBe(24)
    expect(timerStore.stopwatchSeconds).toBe(6)
  })
})

import { beforeEach, describe, expect, it } from 'vitest'
import { useSettingsStore } from '@/stores/settings'
import { SETTINGS_STORAGE_KEY } from '@/utils/storage'
import { setupPinia } from '../helpers/pinia'

describe('settings store', () => {
  beforeEach(() => {
    setupPinia()
  })

  it('exposes formatted countdown and warning times', () => {
    const settingsStore = useSettingsStore()
    settingsStore.$patch({
      baseSeconds: 1800,
      warningSeconds: 180,
      pulseSeconds: 90,
      currentFormat: 'mm:ss'
    })

    expect(settingsStore.countdownTime).toBe('00:30:00')
    expect(settingsStore.warningLongTime).toBe('00:03:00')
    expect(settingsStore.pulseLongTime).toBe('00:01:30')
    expect(settingsStore.warningTime).toBe('03:00')
    expect(settingsStore.pulseTime).toBe('01:30')
  })

  it('patches partial settings in memory', () => {
    const settingsStore = useSettingsStore()
    settingsStore.patchSettings({ fontSize: 33 })
    expect(settingsStore.fontSize).toBe(33)
  })

  it('replaces settings and persists them', () => {
    const settingsStore = useSettingsStore()
    settingsStore.replaceSettings({
      ...settingsStore.$state,
      baseSeconds: 1200,
      lastSettingsTabIndex: 2
    })

    expect(settingsStore.baseSeconds).toBe(1200)
    expect(JSON.parse(localStorage.getItem(SETTINGS_STORAGE_KEY) ?? '')).toMatchObject({
      baseSeconds: 1200,
      lastSettingsTabIndex: 2
    })
  })

  it('persists current state', () => {
    const settingsStore = useSettingsStore()
    settingsStore.patchSettings({ stopwatchEnabled: false })
    settingsStore.persist()

    expect(JSON.parse(localStorage.getItem(SETTINGS_STORAGE_KEY) ?? '')).toMatchObject({
      stopwatchEnabled: false
    })
  })
})

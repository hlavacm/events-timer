import { beforeEach, describe, expect, it } from 'vitest'
import {
  DEFAULT_SETTINGS,
  loadSettings,
  saveSettings,
  SETTINGS_STORAGE_KEY
} from '@/utils/storage'

describe('storage utilities', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns defaults when storage is empty', () => {
    expect(loadSettings()).toEqual(DEFAULT_SETTINGS)
  })

  it('loads valid persisted settings merged with defaults', () => {
    saveSettings({
      ...DEFAULT_SETTINGS,
      baseSeconds: 600,
      fontSize: 30
    })

    expect(loadSettings().baseSeconds).toBe(600)
    expect(loadSettings().fontSize).toBe(30)
    expect(loadSettings().warningSeconds).toBe(DEFAULT_SETTINGS.warningSeconds)
  })

  it('falls back to defaults for invalid JSON', () => {
    localStorage.setItem(SETTINGS_STORAGE_KEY, '{not-json')
    expect(loadSettings()).toEqual(DEFAULT_SETTINGS)
  })

  it('falls back to defaults for incomplete settings', () => {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify({ baseSeconds: 120 }))
    expect(loadSettings()).toEqual(DEFAULT_SETTINGS)
  })

  it('falls back to defaults for invalid time format', () => {
    localStorage.setItem(
      SETTINGS_STORAGE_KEY,
      JSON.stringify({ ...DEFAULT_SETTINGS, currentFormat: 'invalid' })
    )
    expect(loadSettings()).toEqual(DEFAULT_SETTINGS)
  })

  it('persists settings as JSON', () => {
    saveSettings({ ...DEFAULT_SETTINGS, baseSeconds: 900 })
    expect(JSON.parse(localStorage.getItem(SETTINGS_STORAGE_KEY) ?? '')).toMatchObject({
      baseSeconds: 900
    })
  })
})

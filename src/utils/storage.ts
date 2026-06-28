import type { TimerSettings } from '@/types/timer'
import {
  DEFAULT_FONT_SIZE,
  LONG_TIME_FORMAT
} from '@/utils/time'

export const SETTINGS_STORAGE_KEY = 'events-timer:settings:v1'

export const DEFAULT_SETTINGS: TimerSettings = {
  baseSeconds: 1800,
  warningSeconds: 180,
  warningEnabled: true,
  pulseSeconds: 90,
  pulseEnabled: true,
  stopwatchEnabled: true,
  currentFormat: LONG_TIME_FORMAT,
  fontSize: DEFAULT_FONT_SIZE,
  fontSizerEnabled: true,
  lastSettingsTabIndex: 1
}

function isTimeFormat (value: unknown): value is TimerSettings['currentFormat'] {
  return value === 'HH:mm:ss' || value === 'mm:ss'
}

function isValidSettings (value: unknown): value is TimerSettings {
  if (!value || typeof value !== 'object') {
    return false
  }
  const settings = value as Partial<TimerSettings>
  return (
    typeof settings.baseSeconds === 'number' &&
    typeof settings.warningSeconds === 'number' &&
    typeof settings.warningEnabled === 'boolean' &&
    typeof settings.pulseSeconds === 'number' &&
    typeof settings.pulseEnabled === 'boolean' &&
    typeof settings.stopwatchEnabled === 'boolean' &&
    isTimeFormat(settings.currentFormat) &&
    typeof settings.fontSize === 'number' &&
    typeof settings.fontSizerEnabled === 'boolean' &&
    typeof settings.lastSettingsTabIndex === 'number'
  )
}

export function loadSettings (): TimerSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY)
    if (!raw) {
      return { ...DEFAULT_SETTINGS }
    }
    const parsed: unknown = JSON.parse(raw)
    if (!isValidSettings(parsed)) {
      return { ...DEFAULT_SETTINGS }
    }
    return { ...DEFAULT_SETTINGS, ...parsed }
  } catch {
    return { ...DEFAULT_SETTINGS }
  }
}

export function saveSettings (settings: TimerSettings): void {
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings))
}

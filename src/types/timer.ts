export type TimeFormat = 'HH:mm:ss' | 'mm:ss'

export type TimerStatus = 'idle' | 'running' | 'paused'

export type VisualState = 'idle' | 'running' | 'warning' | 'danger' | 'paused'

export interface TimerSettings {
  baseSeconds: number
  warningSeconds: number
  warningEnabled: boolean
  pulseSeconds: number
  pulseEnabled: boolean
  stopwatchEnabled: boolean
  currentFormat: TimeFormat
  fontSize: number
  fontSizerEnabled: boolean
  lastSettingsTabIndex: number
}

export interface TimerState {
  countdownSeconds: number
  stopwatchSeconds: number
  status: TimerStatus
  pulseActive: boolean
  visualState: VisualState
}

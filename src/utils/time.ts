import type { TimeFormat } from '@/types/timer'

export const LONG_TIME_FORMAT: TimeFormat = 'HH:mm:ss'
export const SHORT_TIME_FORMAT: TimeFormat = 'mm:ss'
export const MAX_LONG_TIME_VALUE = 86399
export const MAX_SHORT_TIME_VALUE = 3599
export const DEFAULT_FONT_SIZE = 25
export const MIN_FONT_SIZE = 1
export const MAX_FONT_SIZE = 50

export function getMaxSecondsForFormat (format: TimeFormat): number {
  return format === LONG_TIME_FORMAT ? MAX_LONG_TIME_VALUE : MAX_SHORT_TIME_VALUE
}

function pad (value: number): string {
  return String(value).padStart(2, '0')
}

export function formatAbsoluteSeconds (seconds: number, format: TimeFormat): string {
  const safe = Math.max(0, Math.floor(seconds))
  if (format === SHORT_TIME_FORMAT) {
    const minutes = Math.floor(safe / 60)
    const remainingSeconds = safe % 60
    return `${pad(minutes)}:${pad(remainingSeconds)}`
  }
  const hours = Math.floor(safe / 3600)
  const minutes = Math.floor((safe % 3600) / 60)
  const remainingSeconds = safe % 60
  return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`
}

export function formatSeconds (seconds: number, format: TimeFormat): string {
  if (seconds < 0) {
    return `-${formatAbsoluteSeconds(Math.abs(seconds), format)}`
  }
  return formatAbsoluteSeconds(seconds, format)
}

export function formatCountdownDisplay (
  countdownSeconds: number,
  currentFormat: TimeFormat
): string {
  if (countdownSeconds < 0) {
    const format =
      countdownSeconds < -MAX_SHORT_TIME_VALUE ? LONG_TIME_FORMAT : currentFormat
    return formatSeconds(countdownSeconds, format)
  }
  return formatSeconds(countdownSeconds, currentFormat)
}

export function formatStopwatchDisplay (
  stopwatchSeconds: number,
  currentFormat: TimeFormat
): string {
  const format =
    stopwatchSeconds > MAX_SHORT_TIME_VALUE ? LONG_TIME_FORMAT : currentFormat
  return formatAbsoluteSeconds(stopwatchSeconds, format)
}

export function parseTimeInput (value: string): number {
  const parts = value.split(':').map((part) => Number(part))
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2]
  }
  if (parts.length === 2) {
    return parts[0] * 3600 + parts[1] * 60
  }
  return 0
}

export function secondsToTimeInput (seconds: number): string {
  return formatAbsoluteSeconds(Math.max(0, seconds), LONG_TIME_FORMAT)
}

export function clampSeconds (
  seconds: number,
  minSeconds: number,
  maxSeconds: number
): number {
  return Math.min(maxSeconds, Math.max(minSeconds, Math.floor(seconds)))
}

export function clampNumber (value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, Math.floor(value)))
}

export function secondsToPercentage (
  seconds: number,
  baseSeconds: number
): number {
  if (baseSeconds <= 0) {
    return 0
  }
  return Math.round(seconds / (baseSeconds / 100))
}

export function percentageToSeconds (
  percentage: number,
  baseSeconds: number
): number {
  return Math.round((baseSeconds / 100) * percentage)
}

export function normalizeTimeInput (
  time: string,
  minSeconds: number,
  maxSeconds: number
): string {
  const seconds = clampSeconds(parseTimeInput(time), minSeconds, maxSeconds)
  return secondsToTimeInput(seconds)
}

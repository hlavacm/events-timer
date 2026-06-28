import { describe, expect, it } from 'vitest'
import {
  clampNumber,
  clampSeconds,
  formatAbsoluteSeconds,
  formatCountdownDisplay,
  formatSeconds,
  formatStopwatchDisplay,
  getMaxSecondsForFormat,
  MAX_LONG_TIME_VALUE,
  MAX_SHORT_TIME_VALUE,
  normalizeTimeInput,
  percentageToSeconds,
  parseTimeInput,
  secondsToPercentage,
  secondsToTimeInput
} from '@/utils/time'

describe('time utilities', () => {
  it('formats 1800 seconds as HH:mm:ss', () => {
    expect(formatAbsoluteSeconds(1800, 'HH:mm:ss')).toBe('00:30:00')
  })

  it('formats 1800 seconds as mm:ss', () => {
    expect(formatAbsoluteSeconds(1800, 'mm:ss')).toBe('30:00')
  })

  it('floors fractional seconds when formatting', () => {
    expect(formatAbsoluteSeconds(90.9, 'mm:ss')).toBe('01:30')
  })

  it('formats negative overtime', () => {
    expect(formatSeconds(-1, 'HH:mm:ss')).toBe('-00:00:01')
  })

  it('uses long format for large negative countdown values', () => {
    expect(formatCountdownDisplay(-3600, 'mm:ss')).toBe('-01:00:00')
  })

  it('uses current format for small negative countdown values', () => {
    expect(formatCountdownDisplay(-30, 'mm:ss')).toBe('-00:30')
  })

  it('formats stopwatch with long format for large values', () => {
    expect(formatStopwatchDisplay(4000, 'mm:ss')).toBe('01:06:40')
  })

  it('returns max seconds for each format', () => {
    expect(getMaxSecondsForFormat('HH:mm:ss')).toBe(MAX_LONG_TIME_VALUE)
    expect(getMaxSecondsForFormat('mm:ss')).toBe(MAX_SHORT_TIME_VALUE)
  })

  it('parses HH:mm:ss input', () => {
    expect(parseTimeInput('00:30:00')).toBe(1800)
  })

  it('parses HH:mm input from HTML time fields', () => {
    expect(parseTimeInput('00:30')).toBe(1800)
    expect(parseTimeInput('01:30')).toBe(5400)
  })

  it('returns zero for invalid time input', () => {
    expect(parseTimeInput('')).toBe(0)
    expect(parseTimeInput('12')).toBe(0)
  })

  it('clamps countdown values', () => {
    expect(clampSeconds(10, 60, 1800)).toBe(60)
    expect(clampSeconds(5000, 60, 1800)).toBe(1800)
  })

  it('clamps numeric settings values', () => {
    expect(clampNumber(0, 1, 50)).toBe(1)
    expect(clampNumber(99.9, 1, 50)).toBe(50)
    expect(clampNumber(25, 1, 50)).toBe(25)
  })

  it('converts warning and pulse percentages', () => {
    expect(percentageToSeconds(10, 1800)).toBe(180)
    expect(secondsToPercentage(90, 1800)).toBe(5)
  })

  it('returns zero percentage for non-positive base seconds', () => {
    expect(secondsToPercentage(90, 0)).toBe(0)
  })

  it('normalizes time input within bounds', () => {
    expect(normalizeTimeInput('00:00:30', 60, 1800)).toBe('00:01:00')
    expect(normalizeTimeInput('01:00:00', 60, 1800)).toBe('00:30:00')
  })

  it('converts seconds to HTML time input', () => {
    expect(secondsToTimeInput(1800)).toBe('00:30:00')
    expect(secondsToTimeInput(-5)).toBe('00:00:00')
  })
})

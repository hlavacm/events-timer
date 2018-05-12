
export const LONG_TIME_FORMAT = 'HH:mm:ss'
export const SHORT_TIME_FORMAT = 'mm:ss'
export const MAX_LONG_TIME_VALUE = 86399 // 23:59:59
export const MAX_SHORT_TIME_VALUE = 3599 // 59:59
export const DEFAULT_FONT_SIZE = 25 // vw

export function getMaxCurrentSeconds (format) {
  switch (format) {
    case LONG_TIME_FORMAT:
      return MAX_LONG_TIME_VALUE
    case SHORT_TIME_FORMAT:
      return MAX_SHORT_TIME_VALUE
    default:
      return null
  }
}

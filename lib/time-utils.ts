import { formatInTimeZone } from 'date-fns-tz'
import { toZonedTime, fromZonedTime } from 'date-fns-tz'
import { es } from 'date-fns/locale'

const TIMEZONE = 'America/Argentina/Buenos_Aires'

/**
 * Returns the current date and time in the Argentina timezone.
 */
export function getNowInAR() {
  return toZonedTime(new Date(), TIMEZONE)
}

/**
 * Formats a Date object using the Argentina timezone.
 */
export function formatInAR(date: Date, formatStr: string) {
  return formatInTimeZone(date, TIMEZONE, formatStr, { locale: es })
}

/**
 * Converts a date assumed to be in Argentina timezone to UTC.
 */
export function parseDateFromAR(dateString: string | Date) {
  return fromZonedTime(dateString, TIMEZONE)
}

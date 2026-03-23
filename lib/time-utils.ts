import { format, formatInTimeZone, toDate, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz'
import { es } from 'date-fns/locale'

const TIMEZONE = 'America/Argentina/Buenos_Aires'

/**
 * Returns the current date and time in the Argentina timezone.
 */
export function getNowInAR() {
  return utcToZonedTime(new Date(), TIMEZONE)
}

/**
 * Formats a Date object using the Argentina timezone.
 * @param date The Date object to format
 * @param formatStr The date-fns format string (e.g., 'dd/MM/yyyy HH:mm')
 */
export function formatInAR(date: Date, formatStr: string) {
  return formatInTimeZone(date, TIMEZONE, formatStr, { locale: es })
}

/**
 * Converts a local or UTC date string/object to a specific Date object representing UTC,
 * assuming the input was meant to be in the Argentina timezone.
 * Useful when receiving dates from the client.
 */
export function parseDateFromAR(dateString: string | Date) {
  return zonedTimeToUtc(dateString, TIMEZONE)
}

import { DateTime } from 'luxon'

interface GetLuxonDateParams {
	utc?: boolean
}
export function getLuxonDate(
	date: string | Date,
	options?: GetLuxonDateParams
) {
  let luxonDate: DateTime
  if (date instanceof Date) {
    luxonDate = options?.utc
      ? DateTime.fromJSDate(date, { zone: 'utc' })
      : DateTime.fromJSDate(date) // <-- sin zone
  } else {
    luxonDate = options?.utc
      ? DateTime.fromISO(date, { zone: 'utc' })
      : DateTime.fromISO(date) // <-- sin zone
  }
  return luxonDate.setLocale('es')
}

export function getAgeFromBirthDate(birthDate: string | Date): number {
	const luxonDate = getLuxonDate(birthDate)
	return Math.floor(DateTime.now().diff(luxonDate).as('years'))
}

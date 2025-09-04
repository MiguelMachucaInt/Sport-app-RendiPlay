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
    luxonDate = DateTime.fromJSDate(date, { zone: 'utc' }) // 👈 siempre utc interno
  } else {
    luxonDate = DateTime.fromISO(date, { zone: 'utc' }) // 👈 siempre utc interno
  }
  return luxonDate.setLocale('es')
}


export function getAgeFromBirthDate(birthDate: string | Date): number {
	const luxonDate = getLuxonDate(birthDate)
	return Math.floor(DateTime.now().diff(luxonDate).as('years'))
}

import { DateTime } from 'luxon'

interface GetLuxonDateParams {
	utc?: boolean
}
export function getLuxonDate(
	date: string | Date,
	options?: GetLuxonDateParams
) {
	let zone
	let luxonDate: DateTime<true> | DateTime<false>
	if (options?.utc ?? true) zone = 'utc'
	if (date instanceof Date) {
		luxonDate = DateTime.fromJSDate(date, { zone }).setLocale('es')
	} else {
		luxonDate = DateTime.fromISO(date, { zone }).setLocale('es')
	}
	return luxonDate
}

export function getAgeFromBirthDate(birthDate: string | Date): number {
	const luxonDate = getLuxonDate(birthDate)
	return Math.floor(DateTime.now().diff(luxonDate).as('years'))
}

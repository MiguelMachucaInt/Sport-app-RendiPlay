import { Match } from './match'
import { Sport, SportPoint } from './sport'
import { Tournament } from './tournament'

export interface UserSports {
	user_id: string
	names: string
	lastnames: string
	document_number: string
	birthdate: string // ISO date string
	cellphone: string
	mail: string
	state: string
	active: boolean
	created_at: string // ISO date string
	updated_at: string // ISO date string
	city_id: string
	portrait: string | null
	picture: string | null
	descriptiondesc: string
	currentTournaments: Tournament[]
	getNextMatches: Match[]
	sports_points: SportPoint[]
	sports: Sport[]
	SportVictories: any[]
	
}

export interface CreateUserData {
	names: string
	lastnames: string
	document_number: string
	birthdate: string | Date // ISO date string
	cellphone: string
}

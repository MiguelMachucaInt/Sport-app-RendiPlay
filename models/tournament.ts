import { Category } from './category'

export interface Tournament {
	tournament_id: string
	tournament_desc: string
	sport_desc: string
	sport_id: string
	from_date: string // ISO date string
	equipos: string
	categories: Category[]
	levels: Level[]
	branches: Branch[]
}

export interface Level {
	level_id: string
	level_desc: string
}

export interface Branch {
	sex_branch_id: string
	branch_desc: string
}

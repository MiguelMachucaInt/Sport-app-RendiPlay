export interface Ranking {
	team_desc: string
	points: string
	current_position: number
	last_position: number | null
	category_id: string
	category_desc: string
	level_desc: string
	branch_desc: string
	city_id: string
	city: string
}

export interface GlobalItem extends Ranking {
	user_id: string
}

export interface EquipoItem extends Ranking {
	team_id: string
}

export interface ClubItem extends Ranking {
	club_id: string
}

export interface RankingsResponse {
	Global: GlobalItem[]
	Equipos: EquipoItem[]
	Clubs: ClubItem[]
}

export interface Match {
	tournament_id: string
	tournament_desc: string
	match_id: string
	team_id1: string
	team_desc1: string
	team_id2: string
	team_desc2: string
	matchdate: string // ISO date string
	sport_id: string
	sport_desc: string
}

export interface Partido {
	elo_points: number
	match_id: string
	matchdate: string
	team1: string
	team_id1: string
	team2: string
	team_id2: string
	resultpoints1: string
	resultpoints2: string
	walkover: boolean
	state: string
	state_desc: string
}

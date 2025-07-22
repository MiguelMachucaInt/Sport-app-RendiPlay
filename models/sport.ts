export interface Sport {
	sport_id: string
	sportdesc: string
}

export interface SportPoint extends Sport {
	user_id: string
	points: string
	stars: number
	stars_type: string
	category_desc: string
}

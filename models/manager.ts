export type ManagerTeam = {
  tournament_id: string
  tournament_desc?: string | null;
  team_id: string
  team_name: string
  team_logo?: string | null
  category_id?: string | null
  category_desc?: string | null
  branch_id?: string | null
  branch_desc?: string | null
}

export type TeamPlayer = {
  user_id: string
  names: string
  lastnames: string
  ci?: string | null
  points: number
  category_id?: string | null
  category_desc?: string | null
}

export type AvailablePlayer = TeamPlayer

export type PlayerCategory = {
  category_id: string
  category_desc?: string | null
}

export type PlayerCurrentTeam = {
  team_id: string
  team_name: string
  status: 'PENDING' | 'APPROVED' | string
  tournament_id?: string | null
  tournament_name?: string | null
}

export type PlayerCandidate = TeamPlayer & {
  blocked: boolean
  categories: PlayerCategory[]
  current_team: PlayerCurrentTeam | null
  can_add: boolean
  block_reason?: string | null
}

export type PlayerCandidatesResponse = {
  team_category: PlayerCategory | null
  players: PlayerCandidate[]
}

export type PlayerRequestResult = {
  tournament_id: string
  team_id: string
  user_id: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | string
  active?: boolean | null
}

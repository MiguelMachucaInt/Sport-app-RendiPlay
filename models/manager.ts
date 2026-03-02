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
}

export type AvailablePlayer = TeamPlayer

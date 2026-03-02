/* eslint-disable @typescript-eslint/array-type */
export type HomeUserSportsResponse = {
  currentTournaments?: Array<{
    tournament_id: string;
    tournament_desc?: string;
  }>;
};

export function getCurrentTournamentIds(userSports?: HomeUserSportsResponse | null) {
  return new Set((userSports?.currentTournaments ?? []).map(t => t.tournament_id));
}

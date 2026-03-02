import { Service } from ".";
import type { ManagerTeam, TeamPlayer, AvailablePlayer } from "@/models/manager";

export type TeamsScope = "manager" | "owner";

class TeamsAccessService extends Service {
  private base(scope: TeamsScope) {
    return scope === "owner" ? "owner" : "manager";
  }

  async getTeams(scope: TeamsScope, tournamentId?: string) {

    const base = this.base(scope);
    return this.requester
      .request<ManagerTeam[]>({
        url: `${base}/teams`,
        params: tournamentId ? { tournamentId } : undefined,
      })
      .then((r) => {
        return r.data;
      });

  }

  async getTeamPlayers(scope: TeamsScope, teamId: string, tournamentId?: string) {
    const base = this.base(scope);
    return this.requester
      .request<TeamPlayer[]>({
        url: `${base}/teams/${teamId}/players`,
        params: tournamentId ? { tournamentId } : undefined,
      })
      .then((r) => r.data);
  }

  async getAvailablePlayers(scope: TeamsScope, teamId: string, tournamentId?: string, search?: string) {
    const base = this.base(scope);
    return this.requester
      .request<AvailablePlayer[]>({
        url: `${base}/teams/${teamId}/available-players`,
        params: {
          ...(tournamentId ? { tournamentId } : {}),
          ...(search ? { search } : {}),
        },
      })
      .then((r) => r.data);
  }

  async addPlayer(scope: TeamsScope, teamId: string, tournamentId: string, userId: string) {
    const base = this.base(scope);
    return this.requester
      .request({
        url: `${base}/teams/${teamId}/players`,
        method: "POST",
        data: { tournament_id: tournamentId, user_id: userId },
      })
      .then((r) => r.data);
  }

  async removePlayer(scope: TeamsScope, teamId: string, tournamentId: string, userId: string) {
    const base = this.base(scope);
    return this.requester
      .request({
        url: `${base}/teams/${teamId}/players/${userId}`,
        method: "DELETE",
        params: { tournamentId },
      })
      .then((r) => r.data);
  }
}

export default new TeamsAccessService("");

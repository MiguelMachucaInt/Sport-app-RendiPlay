import { Service } from "."
import { ManagerTeam, TeamPlayer, AvailablePlayer } from "@/models/manager"

class ManagerService extends Service {
  async getMyTeams(tournamentId?: string) {
    return this.requester
      .request<ManagerTeam[]>({
        url: "manager/teams",
        params: tournamentId ? { tournamentId } : undefined,
      })
      .then((res) => res.data)
  }

  async getTeamPlayers(teamId: string, tournamentId?: string) {
    return this.requester
      .request<TeamPlayer[]>({
        url: `manager/teams/${teamId}/players`,
        params: tournamentId ? { tournamentId } : undefined,
      })
      .then((res) => res.data)
  }

  async getAvailablePlayers(teamId: string, tournamentId?: string, search?: string) {
    return this.requester
      .request<AvailablePlayer[]>({
        url: `manager/teams/${teamId}/available-players`,
        params: {
          ...(tournamentId ? { tournamentId } : {}),
          ...(search ? { search } : {}),
        },
      })
      .then((res) => res.data)
  }

  async addPlayer(teamId: string, tournament_id: string, user_id: string) {
    return this.requester
      .request({
        url: `manager/teams/${teamId}/players`,
        method: "POST",
        data: { tournament_id, user_id },
      })
      .then((res) => res.data)
  }

  async removePlayer(teamId: string, tournamentId: string, user_id: string) {
    return this.requester
      .request({
        url: `manager/teams/${teamId}/players/${user_id}`,
        method: "DELETE",
        params: { tournamentId  },
      })
      .then((res) => res.data)
  }
}

export default new ManagerService("")

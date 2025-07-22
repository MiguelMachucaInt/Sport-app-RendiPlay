import { Partido } from '@/models/match'
import { Service } from '.'

class PartidosService extends Service {
	async getPartidos(tournamentId: string) {
		return this.requester
			.request<Partido[]>({
				url: 'matches',
				params: { tournamentId }
			})
			.then((res) => res.data)
	}
}
export default new PartidosService('/tournament')

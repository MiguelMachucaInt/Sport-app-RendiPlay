import { Service } from '.'

class PuntuacionesService extends Service {
	async getPuntuacion(tournamentId: string) {
		const response = await this.requester.request({
			method: 'get',
			params: { tournamentId }
		})
		return response.data
	}
}
export default new PuntuacionesService('/tournament/puntuation')

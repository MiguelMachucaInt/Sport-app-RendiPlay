import { Service } from '.'

class TorneoService extends Service {
	getTorneos() {
		return this.requester.request({
			method: 'get'
		})
	}

	getTorneoById(id: string) {}
}

export default new TorneoService('/torneos')

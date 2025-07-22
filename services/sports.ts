import { Service } from '.'
import { RankingsResponse } from './rating'

class SportService extends Service {
	async getRatingsBySportId(sportId: string) {
		return this.requester
			.request<RankingsResponse>({
				url: 'ratings',
				params: {
					sportId
				}
			})
			.then((res) => res.data)
	}
}

export default new SportService('/sports')

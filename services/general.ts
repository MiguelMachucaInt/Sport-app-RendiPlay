import { UserSports } from '@/models/user'
import { Service } from '.'

class GeneralService extends Service {
	async getHomeUserSports() {
		return this.requester
			.request<UserSports>({
				url: 'app-user-sports'
			})
			.then((res) => res.data)
	}
}
export default new GeneralService('')

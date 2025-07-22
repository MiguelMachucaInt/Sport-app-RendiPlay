import { User } from '@/models/auth'
import { CreateUserData } from '@/models/user'
import { AuthProviderType } from '@/state/auth'
import { Service } from '.'

interface CreateAndSignInParams {
	data: CreateUserData
	provider: AuthProviderType
	token: string
}

class AppUserService extends Service {
	async createAndSignIn({ data, provider, token }: CreateAndSignInParams) {
		return this.requester
			.request<User>({
				url: 'create-and-sign-in',
				method: 'post',
				withAuthToken: false,
				headers: {
					Authorization: `Bearer ${token}`,
					provider
				},
				data
			})
			.then((res) => res.data)
	}
}

export default new AppUserService('/app-user')

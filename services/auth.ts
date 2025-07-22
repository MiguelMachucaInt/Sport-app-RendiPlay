import { User, VerifyUserResponse } from '@/models/auth'
import { CreateUserData } from '@/models/user'
import { AuthProviderType } from '@/state/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Service } from '.'

interface CreateAndSignInParams {
	data: CreateUserData
	provider: AuthProviderType
	token: string
}

class AuthService extends Service {
	async login(account: string, password: string) {
		return this.requester
			.request<User>({
				url: 'login',
				method: 'post',
				withAuthToken: false,
				data: {
					account,
					password
				}
			})
			.then((res) => res.data)
	}

	async loginGeneral(token: string, provider: AuthProviderType) {
		return this.requester
			.request<User>({
				url: 'general',
				method: 'post',
				withAuthToken: false,
				headers: {
					Authorization: `Bearer ${token}`,
					provider
				}
			})
			.then((res) => res.data)
	}

	async googleLogin(token: string) {
		return this.requester
			.request<User>({
				url: 'googleAuth',
				method: 'post',
				withAuthToken: false,
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			.then((res) => res.data)
	}

	async refreshToken(refreshToken?: string | null) {
		const token =
			refreshToken ?? (await AsyncStorage.getItem('refreshToken'))
		return this.requester
			.request<User>({
				method: 'post',
				url: 'refreshToken',
				withAuthToken: false,
				withRefresh: false,
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			.then((res) => res.data)
	}

	async getProfile() {
		return this.requester
			.request({
				url: 'profile'
			})
			.then((res) => res.data)
	}

	async ping() {
		return this.requester
			.request({
				url: 'ping'
			})
			.then((res) => res.data)
	}

	async verifyRegister(token: string, provider: AuthProviderType) {
		return this.requester
			.request<VerifyUserResponse>({
				url: 'verify-token-auth',
				method: 'post',
				withAuthToken: false,
				headers: {
					Authorization: `Bearer ${token}`,
					provider
				}
			})
			.then((res) => res.data)
	}

	async register({ data, provider, token }: CreateAndSignInParams) {
		return this.requester
			.request<User>({
				url: 'register',
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

	async deleteAccount() {
		return this.requester
			.request({
				url: 'delete-account',
				method: 'delete'
			})
			.then((res) => res.data)
	}
}

export default new AuthService('/auth')

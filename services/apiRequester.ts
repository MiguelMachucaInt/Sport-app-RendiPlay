import { API_AUTH_TOKEN, API_BASE_URL } from '@/constants/app'
import { User } from '@/models/auth'
import { saveTokens } from '@/utils/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios, {
	AxiosError,
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
	CreateAxiosDefaults
} from 'axios'

export interface ApiErrorResponse {
	message: string
	statusCode: number
}

export interface RequestOptions extends AxiosRequestConfig {
	withAuthToken?: boolean
	withRefresh?: boolean
	multipartToFormData?: boolean
}

export class ApiRequester {
	private readonly requester: AxiosInstance

	constructor(baseUrl?: string, config?: Partial<CreateAxiosDefaults>) {
		const baseURL = baseUrl ?? API_BASE_URL

		this.requester = axios.create({
			timeout: 60000,
			...config,
			baseURL,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true,
				'Access-Control-Allow-Headers':
					'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
				'x-api-key': API_AUTH_TOKEN,
				...config?.headers
			}
		})
	}

	getRequester(): AxiosInstance {
		return this.requester
	}

	async request<T = any>({
		withAuthToken = true,
		withRefresh = true,
		multipartToFormData = true,
		...options
	}: RequestOptions): Promise<AxiosResponse<T>> {
		const headers: any = {}
		if (withAuthToken)
			headers['Authorization'] =
				`Bearer ${await AsyncStorage.getItem('token')}`
		try {
			let data = options.data
			const res = await this.requester.request<T>({
				...options,
				data,
				headers: {
					...headers,
					...options.headers
				}
			})
			return res
		} catch (e) {
			const error = e as AxiosError<ApiErrorResponse>
			if (error.response?.status === 401 && withRefresh) {
				try {
					await this.refreshToken()
					return this.request<T>({
						...options,
						withRefresh: false
					})
				} catch (e) {}
			}
			throw e
		}
	}

	async refreshToken() {
		const token = await AsyncStorage.getItem('refreshToken')
		if (!token) throw new Error('No token refresh')
		const res = await this.request<User>({
			method: 'POST',
			url: 'auth/refreshToken',
			withAuthToken: false,
			withRefresh: false,
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		await saveTokens(res.data.access_token, res.data.refresh_token)
	}
}

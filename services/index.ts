import { CreateAxiosDefaults } from 'axios'
import { ApiRequester } from './apiRequester'

export abstract class Service {
	protected requester: ApiRequester
	protected url: string

	constructor(
		url: string,
		baseUrl?: string,
		config?: Partial<CreateAxiosDefaults>
	) {
		this.requester = new ApiRequester(baseUrl, config)
		this.requester.getRequester().defaults.baseURL += url
		this.url = url
	}
}

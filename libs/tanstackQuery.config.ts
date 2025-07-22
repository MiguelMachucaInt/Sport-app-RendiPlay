import { QueryClient } from '@tanstack/react-query'
import { Duration } from 'luxon'

const queryClientConfig = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: 2,
			retryDelay: 5000,
			staleTime: Duration.fromObject({ minutes: 3 }).as('milliseconds')
		}
	}
})

export default queryClientConfig

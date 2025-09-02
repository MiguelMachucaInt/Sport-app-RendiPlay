import { useAuthStore } from '@/state/auth'
import { Href, Redirect, useSegments } from 'expo-router'
import { PropsWithChildren } from 'react'
import Loading from './Loading'

interface ProtectedRouteProps extends PropsWithChildren {
	redirectTo: Href
	noAuth?: boolean
}

function ProtectedRoute({
	children,
	noAuth,
	redirectTo
}: Readonly<ProtectedRouteProps>) {
	const { user, isLoading } = useAuthStore()
	const segments = useSegments()

	if (isLoading) {
		return <Loading backgroundColor={'white'} />
	}

	const isNews =
		segments.length === 2 &&
		segments[0] === '(main)' &&
		segments[1] === '(home)'
	const isNew =
		segments.length === 3 &&
		segments[0] === '(main)' &&
		segments[1] === '(home)' &&
		segments[2] === '[id]'

	if (isNews || isNew) {
		return children
	}

	if (noAuth && user) {
		return <Redirect href={redirectTo} />
	}
	if (!noAuth && !user) {
		return <Redirect href={redirectTo} />
	}

	return children
}

export default ProtectedRoute

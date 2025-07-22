import { useAuthStore } from '@/state/auth'
import { Href, Redirect } from 'expo-router'
import { PropsWithChildren } from 'react'
import Loading from './Loading'

interface ProtectedRouteProps extends PropsWithChildren {
    redirectTo: Href
    noAuth?: boolean
}
function ProtectedRoute({ children, noAuth, redirectTo }: Readonly<ProtectedRouteProps>) {
    const { user, isLoading, isAuthenticating } = useAuthStore()

    if (isLoading || isAuthenticating) {
        return <Loading backgroundColor={'white'} />
    }
    if (noAuth) {
        if (user) {
            return <Redirect href={redirectTo} />
        }
    } else if (!user) {
        return <Redirect href={redirectTo} />
    }
    return children
}


export default ProtectedRoute

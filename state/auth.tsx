/* eslint-disable @typescript-eslint/no-unused-vars */
import Loading from '@/components/Loading'
import { AuthProviderHandler } from '@/controllers/authController'
import { useOurToast } from '@/hooks/useOurToast'
import { AuthUser, User } from '@/models/auth'
import { removeTokens, saveTokens } from '@/utils/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import { pick } from 'lodash'
import {
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState
} from 'react'
import { useLoading } from './loading'
import { jwtDecode } from "jwt-decode";
import {
	getCrashlytics,
	setAttributes,
	setUserId,
} from '@react-native-firebase/crashlytics'

interface IAuthContext {
	user: AuthUser | null
	isLoading: boolean
	provider: AuthProviderType | null
	signOut: (showSuccessToast?: boolean) => Promise<void>
	signInWithToken: (
		token: string,
		provider: AuthProviderType
	) => Promise<void>
	signInWithUser: (user: User, provider: AuthProviderType) => Promise<void>
}

const AuthContext = createContext<IAuthContext>({
	user: null,
	signOut: async () => {},
	signInWithToken: async () => {},
	signInWithUser: async () => {},
	isLoading: true,
	provider: null
})

export type AuthProviderType = 'GOOGLE' | 'APPLE'

interface AuthProviderProps extends PropsWithChildren {}
export default function AuthProvider({
	children
}: Readonly<AuthProviderProps>) {
	const [user, setUser] = useState<AuthUser | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [provider, setProvider] = useState<AuthProviderType | null>(null)
	const toast = useOurToast()
	const { showLoading, hideLoading } = useLoading()

	async function signInWithToken(token: string, provider: AuthProviderType) {
		const controller = getAuthControllerFromProvider(provider)
		if (controller) {
			try {
				showLoading()
				console.log(`token ${provider}`, token)
				const resService = await controller.verifyRegister(token)
				//console.log('res', resService)
				if (resService.registrado && resService.user) {
					await setUserFromResponse(resService.user)
					await AsyncStorage.setItem('authProvider', provider)
					setProvider(provider)
					toast({
						title: 'Éxito',
						description: 'Sesión iniciada correctamente'
					})
				} else {
					router.push({
						pathname: '/auth/signUp',
						params: {
							token,
							email: resService.email,
							name: resService.name,
							provider
						}
					})
				}
			} catch (error) {
				//console.log('sign in error', JSON.stringify(error))
				await removeTokens()
				toast({
					title: 'Error',
					description: 'Hubo un problema al iniciar sesión',
					toastProps: {
						action: 'error'
					}
				})
			} finally {
				hideLoading()
			}
		}
	}

	async function signInWithUser(user: User, provider: AuthProviderType) {
		const controller = getAuthControllerFromProvider(provider)
		if (controller) {
			await setUserFromResponse(user)
			await AsyncStorage.setItem('authProvider', provider)
			setProvider(provider)
			toast({
				title: 'Éxito',
				description: 'Usuario creado correctamente'
			})
		}
	}

	async function signOut(showSuccessToast = true) {
		try {
			await removeTokens()
			setUser(null)
			if (showSuccessToast)
				toast({
					title: 'Éxito',
					description: 'Sesión cerrada correctamente'
				})
		} catch (error) {
			toast({
				title: 'Error',
				description: 'Hubo un problema al cerrar sesión',
				toastProps: {
					action: 'error'
				}
			})
		}
	}

type AppTokenPayload = {
  roles?: string[];
  type?: string;
  userId?: string;
  exp?: number;
  iat?: number;
};
	async function setUserFromResponse(user: User) {
		await saveTokens(user.access_token, user.refresh_token)
		const payload = jwtDecode<AppTokenPayload>(user.access_token);
		const roles = payload?.roles ?? [];
		if (!__DEV__) {
    try {
      const crashlytics = getCrashlytics()
      void setUserId(crashlytics, user.user_id)
      void setAttributes(crashlytics, {
        provider: String(provider ?? ''),
        roles: roles.join(',').slice(0, 100),
        mail: String(user.mail ?? '').slice(0, 80),
      })
    } catch {}
  }
		setUser({
			...pick(user, [
				'document_number',
				'birthdate',
				'cellphone',
				'mail',
				'picture',
				'blocked'
			]),
			id: user.user_id,
			name: `${user.names} ${user.lastnames}`,
			roles,
		})
	}

	useEffect(() => {
		async function verifyUser() {
			const provider = (await AsyncStorage.getItem(
				'authProvider'
			)) as AuthProviderType | null
			if (provider) {
				const controller = getAuthControllerFromProvider(provider)
				if (controller) {
					const refreshToken =
						await AsyncStorage.getItem('refreshToken')
					setUserFromResponse(
						await controller.verifyUser(refreshToken)
					)
						.then(() => setProvider(provider))
						.catch(async (e) => {
							console.log(
								'refresh token falló',
								JSON.stringify(e)
							)
							await removeTokens()
						})
				}
			}
		}
		setIsLoading(true)
		verifyUser().finally(() => setIsLoading(false))
	}, [])

	const value = useMemo(
		() => ({
			user,
			isLoading,
			signOut,
			signInWithToken,
			provider,
			signInWithUser
		}),
		[user, isLoading, provider]
	)

	return (
		<AuthContext value={value}>
			{isLoading ? <Loading backgroundColor={'white'} /> : children}
		</AuthContext>
	)
}

export const useAuthStore = () => useContext(AuthContext)

export function getAuthControllerFromProvider(provider: AuthProviderType) {
	return new AuthProviderHandler(provider).getHandler()
}

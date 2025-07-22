import { HOST_URL } from '@/constants/app'
import {
	AuthRequestConfig,
	DiscoveryDocument,
	makeRedirectUri
} from 'expo-auth-session'

export const googleConfig: AuthRequestConfig = {
	clientId: 'google',
	scopes: ['openid', 'profile', 'email'],
	redirectUri: makeRedirectUri()
}

export const googleDiscovery: DiscoveryDocument = {
	authorizationEndpoint: `${HOST_URL}/api/auth/authorize`,
	tokenEndpoint: `${HOST_URL}/api/auth/token`
}

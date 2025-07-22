import { User, VerifyUserResponse } from '@/models/auth'
import AuthService from '@/services/auth'
import { AuthProviderType } from '@/state/auth'
import { Handler } from '@/utils/interfaces'
import AntDesign from '@expo/vector-icons/AntDesign'
import { ReactNode } from 'react'

export interface AuthProviderController<T = User> {
	name: string
	verifyUser(refreshToken: string | null): Promise<T>
	signInWithToken(token: string): Promise<T>
	renderIcon?(props?: any): ReactNode
	verifyRegister(token: string): Promise<VerifyUserResponse>
}

export class AuthProviderHandler extends Handler<AuthProviderController | null> {
	constructor(provider: AuthProviderType) {
		const handlers: Record<AuthProviderType, any> = {
			GOOGLE: GoogleAuthProvider,
			APPLE: AppleAuthProvider
		}
		super(handlers[provider] ? new handlers[provider]() : null)
	}
}

class GoogleAuthProvider implements AuthProviderController {
	name = 'Google'

	async verifyUser(refreshToken: string | null): Promise<User> {
		return await AuthService.refreshToken(refreshToken)
	}

	async signInWithToken(token: string): Promise<User> {
		return await AuthService.loginGeneral(token, 'GOOGLE')
	}

	renderIcon(props): ReactNode {
		return <AntDesign name="google" size={24} color="black" {...props} />
	}

	async verifyRegister(token: string): Promise<VerifyUserResponse> {
		return await AuthService.verifyRegister(token, 'GOOGLE')
	}
}

class AppleAuthProvider implements AuthProviderController {
	name = 'Apple'

	async verifyUser(refreshToken: string | null): Promise<User> {
		return await AuthService.refreshToken(refreshToken)
	}

	async signInWithToken(token: string): Promise<User> {
		return await AuthService.loginGeneral(token, 'APPLE')
	}

	renderIcon(props?: any): ReactNode {
		return <AntDesign name="apple1" size={24} color="black" {...props} />
	}

	async verifyRegister(token: string): Promise<VerifyUserResponse> {
		return await AuthService.verifyRegister(token, 'APPLE')
	}
}

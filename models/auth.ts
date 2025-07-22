export interface AuthUser
	extends Pick<User, 'document_number' | 'birthdate' | 'cellphone' | 'mail'> {
	id: string
	name: string
	picture?: string | null
}

export interface User {
	user_id: string
	names: string
	lastnames: string
	document_number: string
	birthdate: string
	cellphone: string
	mail: string
	state: string
	active: boolean
	created_at: string
	updated_at: string
	city_id: string
	portrait: string | null
	picture: string | null
	access_token: string
	refresh_token: string
}
export interface VerifyUserResponse {
	user?: User | null
	registrado: boolean
	email: string
	name?: string
}

import {
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	GOOGLE_REDIRECT_URI
} from '@/constants/app'

export async function GET(request: Request) {
	const incomingParams = new URLSearchParams(request.url.split('?')[1])
	const code = incomingParams.get('code')
	const combinedPlatformAndState = incomingParams.get('state')

	if (!combinedPlatformAndState || !code) {
		return Response.json(
			{ error: 'Invalid request: missing state or code' },
			{ status: 400 }
		)
	}
	let [platform, state, redirectUri, from] =
		combinedPlatformAndState.split('|')

	// Intercambiamos el código por tokens con Google
	const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			code,
			client_id: GOOGLE_CLIENT_ID,
			client_secret: GOOGLE_CLIENT_SECRET,
			redirect_uri: GOOGLE_REDIRECT_URI,
			grant_type: 'authorization_code'
		}).toString()
	})

	if (!tokenResponse.ok) {
		const error = await tokenResponse.text()
		console.error('Token exchange failed:', error)
		return Response.json(
			{ error: 'Failed to exchange code for token' },
			{ status: 500 }
		)
	}

	const tokenData = await tokenResponse.json()

	const outgoingParams = new URLSearchParams({
		state,
		id_token: tokenData.id_token || '',
		access_token: tokenData.access_token || ''
	})

	let redirectTo = redirectUri
	if (from) {
		redirectTo += from.length > 1 ? from.replace('/', '') : from
	}
	return Response.redirect(`${redirectTo}?${outgoingParams.toString()}`)
}

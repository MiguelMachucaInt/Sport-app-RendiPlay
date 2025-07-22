import {
	GOOGLE_AUTH_URL,
	GOOGLE_CLIENT_ID,
	GOOGLE_REDIRECT_URI
} from '@/constants/app'

export async function GET(request: Request) {
	if (!GOOGLE_CLIENT_ID) {
		return Response.json(
			{ error: 'Missing GOOGLE_CLIENT_ID environment variable' },
			{ status: 500 }
		)
	}

	const url = new URL(request.url)

	let idpClientId: string
	const internalClient = url.searchParams.get('client_id')
	const redirectUri = url.searchParams.get('redirect_uri')
	const platform = url.searchParams.get('platform')
	const from = url.searchParams.get('from')

	// use state to drive redirect back to platform
	let state =
		platform +
		'|' +
		url.searchParams.get('state') +
		'|' +
		redirectUri +
		'|' +
		from

	if (internalClient === 'google') {
		idpClientId = GOOGLE_CLIENT_ID
	} else {
		return Response.json({ error: 'Invalid client' }, { status: 400 })
	}

	// additional enforcement
	if (!state) {
		return Response.json({ error: 'Invalid state' }, { status: 400 })
	}

	const params = new URLSearchParams({
		client_id: idpClientId,
		redirect_uri: GOOGLE_REDIRECT_URI,
		response_type: 'code',
		scope: url.searchParams.get('scope') || 'identity',
		state,
		prompt: 'select_account'
	})
	return Response.redirect(GOOGLE_AUTH_URL + '?' + params.toString())
}

import Constants from 'expo-constants'

const extraParams = Constants.expoConfig?.extra

export const HOST_URL = extraParams?.hostUrl
export const APP_SCHEME = extraParams?.scheme

//api
export const API_BASE_URL = extraParams?.apiBaseUrl
export const API_AUTH_TOKEN = extraParams?.apiAuthToken

// Google OAuth Constants
export const GOOGLE_CLIENT_ID = extraParams?.googleWebClientId
export const GOOGLE_REDIRECT_URI = `${HOST_URL}/api/auth/callback`
export const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth'

// Apple OAuth Constants
export const APPLE_CLIENT_ID = 'com.beto.expoauthexample.web'
export const APPLE_CLIENT_SECRET = process.env.APPLE_CLIENT_SECRET
export const APPLE_REDIRECT_URI = `${process.env.EXPO_PUBLIC_BASE_URL}/api/auth/apple/callback`
export const APPLE_AUTH_URL = 'https://appleid.apple.com/auth/authorize'

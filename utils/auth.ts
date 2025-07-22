import AsyncStorage from '@react-native-async-storage/async-storage'

export async function removeTokens() {
	await AsyncStorage.removeItem('token')
	await AsyncStorage.removeItem('refreshToken')
}

export async function saveTokens(token: string, refreshToken: string) {
	await AsyncStorage.setItem('token', token)
	await AsyncStorage.setItem('refreshToken', refreshToken)
}

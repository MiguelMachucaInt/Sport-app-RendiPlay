// import CryptoJS from 'crypto-js'

// const env = process.env

// const SECRET_KEY = env.EXPO_PUBLIC_API_SECRET_KEY

// export const encrypt = (text: string): string => {
// 	return CryptoJS.AES.encrypt(text, SECRET_KEY).toString()
// }

// export const decrypt = (cipher: string): string => {
// 	try {
// 		const bytes = CryptoJS.AES.decrypt(cipher, SECRET_KEY)
// 		const decrypted = bytes.toString(CryptoJS.enc.Utf8)
// 		if (!decrypted) throw new Error('Clave incorrecta o dato corrupto')
// 		return decrypted
// 	} catch (error) {
// 		console.error('Error al desencriptar:', error)
// 		return ''
// 	}
// }

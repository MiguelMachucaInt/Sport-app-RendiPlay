import { useAuthStore } from '@/state/auth'
import { googleConfig, googleDiscovery } from '@/utils/authProviders/google'
import AntDesign from '@expo/vector-icons/AntDesign'
import { AuthSessionResult, makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import { usePathname } from 'expo-router'
import { useEffect } from 'react'
import { Platform } from 'react-native'
import OurButton from './ui/ourButton'

export interface SignInButtonProps<T = any> {
    onPress?: () => void
    onResponded?: (res: T) => void
    show?: boolean
}

interface GoogleSignInButtonProps extends SignInButtonProps<AuthSessionResult | null> {
    onPress?: () => void
    onResponded?: (res: AuthSessionResult | null) => void
    show?: boolean
}
function GoogleSignInButton({ onPress, onResponded, show = true }: Readonly<GoogleSignInButtonProps>) {
    const { signInWithToken } = useAuthStore()
    const [request, response, promptAsync] = useAuthRequest({
        ...googleConfig,
        extraParams: {
            platform: Platform.OS,
            from: usePathname()
        },
        redirectUri: makeRedirectUri()
    }, googleDiscovery)

    async function handleResponse() {
        if (onResponded) onResponded(response)
        if (response?.type == 'success') {
            await signInWithToken(response.params.id_token, 'GOOGLE')
        }
    }

    useEffect(() => {
        handleResponse()
    }, [response])

    return show ? (
        <OurButton
            leftAddon={<AntDesign name="google" size={24} color="white" />}
            textStyles={{
                fontSize: 14
            }}
            containerProps={{
                alignItems: 'center'
            }}
            onPress={() => {
                if (onPress) onPress()
                if (request) promptAsync()
            }}
        >
            Iniciar Sesión con Google
        </OurButton>
    ) : null
}

export default GoogleSignInButton

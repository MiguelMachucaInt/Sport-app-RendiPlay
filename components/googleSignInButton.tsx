import { useAuthStore } from '@/state/auth'
import { googleConfig, googleDiscovery } from '@/utils/authProviders/google'
import AntDesign from '@expo/vector-icons/AntDesign'
import { AuthSessionResult, makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import { usePathname } from 'expo-router'
import { useEffect } from 'react'
import { Alert, Platform } from 'react-native'
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
        void handleResponse()
    }, [response])

    async function startGoogleSignIn() {
        if (!request) {
            Alert.alert(
                'Inicio de sesión',
                'Google todavía se está preparando. Intenta nuevamente en unos segundos.'
            )
            return
        }

        try {
            if (onPress) onPress()
            await promptAsync()
        } catch (error) {
            console.error('🔴 [Google Auth] No se pudo abrir la autenticación:', error)
            Alert.alert(
                'No se pudo iniciar sesión',
                'No fue posible abrir Google. Verifica tu conexión e intenta nuevamente.'
            )
            if (onResponded) {
                onResponded({ type: 'error', error } as unknown as AuthSessionResult)
            }
        }
    }

    return show ? (
        <OurButton
            leftAddon={<AntDesign name="google" size={24} color="white" />}
            textStyles={{
                fontSize: 14
            }}
            containerProps={{
                alignItems: 'center'
            }}
            onPress={() => void startGoogleSignIn()}
        >
            {request ? 'Iniciar Sesión con Google' : 'Preparando Google...'}
        </OurButton>
    ) : null
}

export default GoogleSignInButton

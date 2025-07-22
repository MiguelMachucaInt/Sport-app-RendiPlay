import { colors } from '@/assets/colors/styles'
import { stylesHeaders } from '@/assets/customStyles'
import ProtectedRoute from '@/components/ProtectedRoute'
import { LinearGradient } from 'expo-linear-gradient'
import { Stack } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'
import { SafeAreaView } from 'react-native-safe-area-context'

WebBrowser.maybeCompleteAuthSession()

export default function AuthLayout() {
    return (
        <ProtectedRoute redirectTo={'/'} noAuth>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <LinearGradient
                    colors={[
                        `${colors.primary.naranja}`,
                        `${colors.secondary.rosado}90`
                    ]}
                    style={[
                        stylesHeaders.ovalLogin, { zIndex: 0 }
                    ]}
                    start={{ x: 1, y: 1 }} // Punto inferior derecho
                    end={{ x: 0, y: 0 }} // Punto superior izquierdo
                />
                <Stack
                    screenOptions={{
                        contentStyle: { backgroundColor: 'transparent' },
                        headerShown: false
                    }}
                >
                    <Stack.Screen name="index" />
                    <Stack.Screen name="login" />
                    <Stack.Screen name="signUp" />
                </Stack>
            </SafeAreaView>
        </ProtectedRoute>
    )
}

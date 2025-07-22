import { colors } from '@/assets/colors/styles'
import {
    PropsWithChildren,
    createContext,
    useContext,
    useMemo,
    useState
} from 'react'
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from 'react-native'

interface ILoadingContext {
    showLoading(message?: string): void
    hideLoading(): void
    isLoading: boolean
}

const LoadingContext = createContext<ILoadingContext>({
    showLoading: () => { },
    hideLoading: () => { },
    isLoading: false
})

interface LoadingProviderProps extends PropsWithChildren { }
export default function LoadingProvider({
    children
}: Readonly<LoadingProviderProps>) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')

    function showLoading(message?: string) {
        setIsLoading(true)
        if (message) setMessage(message)
    }

    function hideLoading() {
        setIsLoading(false)
        setMessage('')
    }

    const value = useMemo(
        () => ({
            showLoading,
            hideLoading,
            isLoading
        }),
        [isLoading]
    )

    return (
        <LoadingContext value={value}>
            {children}
            {isLoading && <View style={styles.overlay} pointerEvents="auto">
                <View style={styles.content}>
                    <ActivityIndicator size="large" color={colors.primary.naranja} />
                    {message && <Text style={styles.message}>{message}</Text>}
                </View>
            </View>}
        </LoadingContext>
    )
}
const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: 'rgba(128, 128, 128, 0.5)', // gris con opacidad
        zIndex: 9999,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
    },
    message: {
        marginTop: 12,
        color: colors.primary.naranja,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export const useLoading = () => useContext(LoadingContext)

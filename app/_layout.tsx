import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import '@/global.css'
import TamaguiProvider from '@/libs/tamagui.config'
import queryClientConfig from '@/libs/tanstackQuery.config'
import AuthProvider from '@/state/auth'
import LoadingProvider from '@/state/loading'
import { DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Image, Platform, View } from 'react-native'
import 'react-native-reanimated'


export default function RootLayout() {
    const mobileWidth = 744
    const mobileHeight = 850

    const isWeb = Platform.OS === 'web'

    const images = [
        require('@/assets/images/sportsBackground/futbol.jpg'),
        require('@/assets/images/sportsBackground/basket.jpg'),
        require('@/assets/images/sportsBackground/tennis.jpg'),
        require('@/assets/images/sportsBackground/volley.jpg')
    ]

    const content = (
        <GluestackUIProvider mode="light">
            <ThemeProvider value={DefaultTheme}>
                <TamaguiProvider>
                    <QueryClientProvider client={queryClientConfig}>
                        <LoadingProvider>
                            <AuthProvider>
                                <Stack
                                    screenOptions={{ headerShown: false }}
                                    initialRouteName='auth'
                                />
                            </AuthProvider>
                        </LoadingProvider>
                    </QueryClientProvider>
                    <StatusBar style="auto" />
                </TamaguiProvider>
            </ThemeProvider>
        </GluestackUIProvider>
    )

    if (isWeb) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#000',
                    flexDirection: 'row'
                    // position: 'relative'
                }}
            >
                <View
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: '35%',
                        justifyContent: 'space-around',
                        alignItems: 'flex-end',
                        zIndex: 1
                    }}
                >
                    <Image
                        source={images[0]}
                        style={{
                            width: '100%',
                            resizeMode: 'none'
                        }}
                    />
                    <Image
                        source={images[1]}
                        style={{
                            width: '100%',
                            resizeMode: 'none'
                        }}
                    />
                </View>

                <View
                    style={{
                        width: mobileWidth,
                        height: mobileHeight,
                        overflow: 'hidden',
                        borderRadius: 24,
                        borderWidth: 10,
                        borderColor: '#000',
                        // position: 'relative',
                        zIndex: 2
                    }}
                >
                    {content}
                </View>

                <View
                    style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        width: '35%',
                        height: '100%',
                        // justifyContent: 'space-around',
                        alignItems: 'flex-start',
                        zIndex: 1
                    }}
                >
                    <Image
                        source={images[2]}
                        style={{
                            width: '100%',
                            height: '50%',

                            resizeMode: 'none'
                        }}
                    />
                    <Image
                        source={images[3]}
                        style={{
                            width: '100%',
                            resizeMode: 'none'
                        }}
                    />
                </View>
            </View>
        )
    }

    return content
}

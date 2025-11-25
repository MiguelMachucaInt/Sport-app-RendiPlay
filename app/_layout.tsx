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

export default function RootLayout() {
	const content = (
		<GluestackUIProvider mode="light">
			<ThemeProvider value={DefaultTheme}>
				<TamaguiProvider>
					<QueryClientProvider client={queryClientConfig}>
						<LoadingProvider>
							<AuthProvider>
								<Stack screenOptions={{ headerShown: false }} />
							</AuthProvider>
						</LoadingProvider>
					</QueryClientProvider>
					<StatusBar style="auto" />
				</TamaguiProvider>
			</ThemeProvider>
		</GluestackUIProvider>
	)

	return content
}

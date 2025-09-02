import { colors } from '@/assets/colors/styles'
import { stylesHeaders } from '@/assets/customStyles'
import CustomHeader from '@/components/header'
import ProtectedRoute from '@/components/ProtectedRoute'
import { isIos } from '@tamagui/core'
import { LinearGradient } from 'expo-linear-gradient'
import { Stack } from 'expo-router'
import { Image, View } from 'react-native'

interface MainLayoutProps {}
function MainLayout({ ...props }: Readonly<MainLayoutProps>) {
	return (
		<ProtectedRoute redirectTo={'/(main)/(home)'}>
			<View
				style={{
					flex: 1,
					backgroundColor: 'white',
					position: 'relative'
				}}
			>
				<LinearGradient
					colors={[
						`${colors.primary.naranja}`,
						`${colors.secondary.rosado}90`
					]}
					style={[
						stylesHeaders.ovalHeader,
						{ position: 'absolute', zIndex: 0 }
					]}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
					pointerEvents="none"
				/>
				<Stack
					screenOptions={{
						header: ({ options }) => {
							return (
								<CustomHeader
									title={options.title || 'Mi App'}
								/>
							)
						},
						contentStyle: {
							backgroundColor: 'transparent',
							flex: 1
						},
						gestureEnabled: true,
						animation: isIos ? 'none' : 'fade'
					}}
				>
					<Stack.Screen name="(home)" options={{ title: 'Inicio' }} />
					<Stack.Screen
						name="ranking/[sportId]"
						options={{ title: 'Ranking' }}
					/>
					<Stack.Screen
						name="torneo/index"
						options={{ title: 'Torneo' }}
					/>
				</Stack>
			</View>
			<Image
				source={require('@/assets/images/logo.png')}
				style={{
					position: 'absolute',
					width: 50,
					height: 50,
					top: 45,
					left: 100,
					zIndex: 1
				}}
			/>
		</ProtectedRoute>
	)
}

export default MainLayout

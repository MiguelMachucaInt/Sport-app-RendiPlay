import { colors } from '@/assets/colors/styles'
import BlockedOverlay from '@/components/blocked/BlockedOverlay'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useAuthStore } from '@/state/auth'

import FontAwesome from '@expo/vector-icons/FontAwesome'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { Tabs, usePathname } from 'expo-router'

interface HomeLayoutProps {}
function HomeLayout({ ...props }: Readonly<HomeLayoutProps>) {
	const { user } = useAuthStore()
	const pathname = usePathname()
	const showOverlay = user?.blocked && pathname !== '/'

	return (
		<ProtectedRoute redirectTo={'/(main)/(home)'}>
			<Tabs
				screenOptions={{
					headerShown: false,
					sceneStyle: {
						backgroundColor: 'transparent'
					},
					tabBarActiveTintColor: colors.primary.naranja
				}}
			>
				<Tabs.Screen
					name="index"
					options={{
						title: 'INICIO',
						tabBarIcon: ({ color }) => (
							<FontAwesome name="home" size={24} color={color} />
						)
					}}
				/>
				<Tabs.Screen
					name="campeonato"
					options={{
						title: 'TORNEOS',
						href: user ? '/(main)/(home)/campeonato' : null,
						tabBarIcon: ({ color }) => (
							<FontAwesome6
								name="trophy"
								size={20}
								color={color}
							/>
						)
					}}
				/>
				<Tabs.Screen
					name="perfil"
					options={{
						title: 'PERFIL',
						href: user ? '/(main)/(home)/perfil' : null,
						tabBarIcon: ({ color }) => (
							<FontAwesome6
								name="user-gear"
								size={20}
								color={color}
							/>
						)
					}}
				/>
				<Tabs.Screen
					name="[id]"
					options={{
						href: null
					}}
				/>
			</Tabs>
			<BlockedOverlay show={showOverlay} />
		</ProtectedRoute>
	)
}

export default HomeLayout

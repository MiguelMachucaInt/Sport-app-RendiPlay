import { colors } from '@/assets/colors/styles'
import { useAuthStore } from '@/state/auth'
import AntDesign from '@expo/vector-icons/AntDesign'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import Ionicons from '@expo/vector-icons/Ionicons'
import { router } from 'expo-router'
import IconButton from '../ui/IconButton'
import { Menu, MenuItem, MenuItemLabel, MenuSeparator } from '../ui/menu'

interface UserMenuIconProps {}

function UserMenuIcon({ ...props }: Readonly<UserMenuIconProps>) {
	const { signOut, user } = useAuthStore()
	const isManager = !!user?.roles?.includes('Manager')

	return (
		<Menu
			placement="bottom"
			offset={5}
			trigger={({ ...triggerProps }) => {
				return (
					<IconButton
						icon={<AntDesign name="user" size={24} color="white" />}
						touchableProps={{
							...triggerProps
						}}
					/>
				)
			}}
			style={{ width: 150 }}
		>
			{user ? (
				<>
					<MenuItem
						key="Perfil"
						textValue="Perfil"
						style={{ gap: 7 }}
						onPress={() => router.push('/perfil')}
					>
						<FontAwesome6
							name="user-gear"
							size={20}
							color={colors.primary.naranja}
						/>
						<MenuItemLabel size="md">Perfil</MenuItemLabel>
					</MenuItem>
					<MenuItem
						key="MisTorneos"
						textValue="Mis Torneos"
						onPress={() => router.push('/(main)/(home)/campeonato')}
						style={{ gap: 7 }}
					>
						<FontAwesome6
							name="trophy"
							size={20}
							color={colors.primary.naranja}
						/>
						<MenuItemLabel size="md">Mis Torneos</MenuItemLabel>
					</MenuItem>
					<MenuSeparator />
					{isManager && (
						<MenuItem
							key="MisEquipos"
							textValue="Mis Equipos"
							onPress={() =>
								router.push('/(main)/(home)/manager')
							}
							style={{ gap: 7 }}
						>
							<FontAwesome6
								name="people-group"
								size={20}
								color={colors.primary.naranja}
							/>
							<MenuItemLabel size="md">Mis Equipos</MenuItemLabel>
						</MenuItem>
					)}
					<MenuItem
						key="CerrarSesion"
						textValue="Cerrar sesión"
						onPress={signOut}
						style={{ gap: 3 }}
					>
						<Ionicons
							name="log-out-outline"
							size={24}
							color={colors.primary.naranja}
						/>
						<MenuItemLabel size="md">Cerrar Sesión</MenuItemLabel>
					</MenuItem>
				</>
			) : (
				<MenuItem
					key="IniciarSesion"
					textValue="Iniciar sesión"
					onPress={() => router.push('/auth')}
					style={{ gap: 5 }}
				>
					<Ionicons
						name="log-in-outline"
						size={24}
						color={colors.primary.naranja}
					/>
					<MenuItemLabel size="md">Iniciar Sesión</MenuItemLabel>
				</MenuItem>
			)}
		</Menu>
	)
}

export default UserMenuIcon

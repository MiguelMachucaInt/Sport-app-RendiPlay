import { colors } from '@/assets/colors/styles'
import { useAuthStore } from '@/state/auth'
import AntDesign from '@expo/vector-icons/AntDesign'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import Ionicons from '@expo/vector-icons/Ionicons'
import { router } from 'expo-router'
import IconButton from '../ui/IconButton'
import { Menu, MenuItem, MenuItemLabel, MenuSeparator } from '../ui/menu'

interface UserMenuIconProps { }
function UserMenuIcon({ ...props }: Readonly<UserMenuIconProps>) {
	const { signOut } = useAuthStore()

	return (
		<Menu
			placement="bottom"
			offset={5}
			disabledKeys={['Settings']}
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
			<MenuItem
				key="Add account"
				textValue="Add account"
				style={{ gap: 7, width: 0 }}
				onPress={() => router.push('/perfil')}
			>
				<FontAwesome6
					name="user-gear"
					size={20}
					color={colors.primary.naranja}
				/>
				<MenuItemLabel size="md">Perfil</MenuItemLabel>
			</MenuItem>
			<MenuSeparator />
			<MenuItem
				key="Community"
				textValue="Community"
				onPress={signOut}
				style={{ gap: 3 }}
			>
				<Ionicons
					name="log-in-outline"
					size={24}
					color={colors.primary.naranja}
				/>
				<MenuItemLabel size="md">Cerrar Sesión</MenuItemLabel>
			</MenuItem>
		</Menu>
	)
}

export default UserMenuIcon

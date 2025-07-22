import { stylesHeaders } from '@/assets/customStyles'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useRouter, useSegments } from 'expo-router'
import { Platform, Text, View } from 'react-native'
import IconButton from '../ui/IconButton'
import UserMenuIcon from './menuIcon'

interface CustomHeaderProps {
	title?: string
}

export default function CustomHeader({ title = '' }: CustomHeaderProps) {
	const segments = useSegments()
	const isHomeScreen = segments.length === 2 && segments[1] === '(home)'
	const router = useRouter()

	const handleGoBack = () => {
		if (router.canGoBack()) {
			router.back()
		}
	}

	return (
		<View
			style={[
				stylesHeaders.headerWrapper,
				Platform.OS === 'web' ? { backgroundColor: 'black' } : {}
			]}
		>
			<View style={stylesHeaders.iconLeft}>
				{!isHomeScreen && (
					<IconButton
						icon={
							<AntDesign
								name="arrowleft"
								size={22}
								color="white"
							/>
						}
						touchableProps={{
							onPress: handleGoBack
						}}
					/>
				)}
			</View>

			<View style={stylesHeaders.titleContainer}>
				{title && (
					<Text style={stylesHeaders.headerTitle}>{title}</Text>
				)}
			</View>
			<View style={stylesHeaders.iconRight}>
				<UserMenuIcon />
			</View>
		</View>
	)
}

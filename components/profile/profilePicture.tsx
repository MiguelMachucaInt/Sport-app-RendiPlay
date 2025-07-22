import { stylesProfile } from '@/assets/customStyles'
import { useAuthStore } from '@/state/auth'
import { Image } from 'react-native'
import { Card } from '../ui/card'

function ProfilePicture() {
	const { user } = useAuthStore()

	return (
		<Card style={stylesProfile.card}>
			<Image
				source={
					user?.picture
						? { uri: user?.picture }
						: require('@/assets/images/user.png')
				}
				style={stylesProfile.image}
				resizeMode="cover"
			/>
		</Card>
	)
}

export default ProfilePicture

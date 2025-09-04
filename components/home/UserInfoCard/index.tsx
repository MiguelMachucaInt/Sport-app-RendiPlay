import { colors } from '@/assets/colors/styles'
import { SportPoint } from '@/models/sport'
import { useAuthStore } from '@/state/auth'
import { YStack } from '@tamagui/stacks'
import { SizableText } from '@tamagui/text'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet } from 'react-native'
import SportCardInfo from './SportCardInfo'

interface UserInfoCardProps {
	data: SportPoint[]
}

function UserInfoCard({ data }: Readonly<UserInfoCardProps>) {
	const { user } = useAuthStore()

	return (
		<LinearGradient
			colors={[colors.primary.naranja, colors.secondary.rosado]}
			style={styles.card}
		>
			<YStack gap={18}>
				<SizableText
					color={'white'}
					fontWeight={'700'}
					fontSize={20}
					textAlign="center"
				>
					{user?.name}
				</SizableText>
				<YStack style={styles.content} gap={10}>
					{data.map((el) => (
						<SportCardInfo key={el.sport_id} data={el} />
					))}
				</YStack>
			</YStack>
		</LinearGradient>
	)
}

const styles = StyleSheet.create({
	card: {
		paddingVertical: 20,
		paddingHorizontal: 30,
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	},
	content: {
		width: '100%'
	}
})

export default UserInfoCard

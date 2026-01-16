import { colors } from '@/assets/colors/styles'
import SportTeam from '@/components/SportTeam'
import OurCard from '@/components/ui/ourCard'
import { Match } from '@/models/match'
import { getLuxonDate } from '@/utils/date'
import { XStack, YStack } from '@tamagui/stacks'
import { SizableText } from '@tamagui/text'
import { LinearGradient } from 'expo-linear-gradient'
import { Dimensions, Text } from 'react-native'
import SportIcon from '../../Rankings/Sport'

interface EventoSportCardProps {
	match: Match
}

function EventoSportCard({ match }: Readonly<EventoSportCardProps>) {
	const currentWidth = Dimensions.get('screen').width
	const date = getLuxonDate(match.program_date ?? match.matchdate, {
		utc: true
	})

	return (
		<OurCard
			style={{
				width: currentWidth - currentWidth * 0.1,
				paddingVertical: 14,
				paddingHorizontal: 16,
				borderRadius: 16,
				overflow: 'hidden',
				alignItems: 'center',
				justifyContent: 'center',
				gap: 10
			}}
		>
			{/* GRADIENT HEADER */}
			<LinearGradient
				colors={[colors.primary.naranja, colors.secondary.rosado]}
				style={{
					width: '100%',
					paddingVertical: 12,
					paddingHorizontal: 16,
					borderRadius: 16
				}}
			>
				<SizableText
					fontWeight="900"
					fontSize={18}
					color="white"
					numberOfLines={2}
					style={{ textAlign: 'center' }}
				>
					{match.tournament_desc}
				</SizableText>
			</LinearGradient>

			{/* CONTENT */}
			<XStack
				width="100%"
				alignItems="center"
				justifyContent="center"
				gap={16}
				marginTop={12}
			>
				{/* Team 1 */}
				<SportTeam
					teamName={match.team_desc1}
					textProps={{
						width: 100,
						numberOfLines: 2,
						textAlign: 'center',
						fontSize: 14,
						style: {
							color: 'black',
							fontWeight: '700',
							textShadowColor: 'rgba(0,0,0,0.8)',
							textShadowOffset: { width: 1, height: 1 },
							textShadowRadius: 4,
							backgroundColor: 'rgba(255,255,255,0.05)',
							paddingHorizontal: 4,
							paddingVertical: 2,
							borderRadius: 4
						}
					}}
				/>

				{/* Center Info */}
				<YStack alignItems="center" gap={4}>
					<Text style={{ fontWeight: '700', fontSize: 15 }}>
						{date.toUTC().toFormat('dd MMM yyyy')}
					</Text>
					<Text style={{ fontSize: 12, opacity: 0.7 }}>
						{match.field}
					</Text>
					<Text
						style={{
							fontSize: 26,
							fontWeight: '900',
							marginVertical: 2
						}}
					>
						VS
					</Text>
					<Text style={{ fontWeight: '700', fontSize: 15 }}>
						{date.toUTC().toFormat('HH:mm')}
					</Text>
				</YStack>

				{/* Team 2 */}
				<SportTeam
					teamName={match.team_desc2}
					textProps={{
						width: 100,
						numberOfLines: 2,
						textAlign: 'center',
						fontSize: 14,
						style: {
							color: 'black',
							fontWeight: '700',
							textShadowColor: 'rgba(0,0,0,0.8)',
							textShadowOffset: { width: 1, height: 1 },
							textShadowRadius: 4,
							backgroundColor: 'rgba(255,255,255,0.05)',
							paddingHorizontal: 4,
							paddingVertical: 2,
							borderRadius: 4
						}
					}}
				/>
			</XStack>

			{/* Sport Icon */}
			<SportIcon
				sport={{
					sport_id: match.sport_id,
					sportdesc: match.sport_desc
				}}
				containerProps={{
					position: 'absolute',
					scale: 0.55,
					right: 10,
					top: -12
				}}
			/>
		</OurCard>
	)
}

export default EventoSportCard

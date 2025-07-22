import SportTeam from '@/components/SportTeam'
import OurCard from '@/components/ui/ourCard'
import { Match } from '@/models/match'
import { getLuxonDate } from '@/utils/date'
import { XStack, YStack } from '@tamagui/stacks'
import { SizableText } from '@tamagui/text'
import { Dimensions, Text } from 'react-native'
import SportIcon from '../../Rankings/Sport'

interface EventoSportCardProps {
	match: Match
}
function EventoSportCard({ match }: Readonly<EventoSportCardProps>) {
	const currentWidth = Dimensions.get('screen').width
	const date = getLuxonDate(match.matchdate)
	return (
		<OurCard style={{ width: currentWidth - currentWidth * 0.1 }}>
			<SizableText fontWeight={'800'} fontSize={16}>
				{match.tournament_desc}
			</SizableText>
			<YStack gap={5} paddingBottom={10}>
				<XStack justifyContent="space-around" marginTop={12}>
					<SportTeam teamName={match.team_desc1} textProps={{ width: 100, textWrap: 'pretty', textAlign: 'center' }} />
					<YStack alignItems="center">
						<Text>{date.toFormat('dd/MM/yyyy')}</Text>
						<Text style={{ fontSize: 20 }}>Vs</Text>
						<Text>{date.toFormat('T')}</Text>
					</YStack>
					<SportTeam teamName={match.team_desc2} textProps={{ width: 100, textWrap: 'pretty', textAlign: 'center' }} />
				</XStack>
			</YStack>
			<SportIcon
				sport={{
					sport_id: match.sport_id,
					sportdesc: match.sport_desc
				}}
				containerProps={{
					position: 'absolute',
					scale: 0.5,
					right: 10,
					top: -8
				}}
			/>
		</OurCard>
	)
}

export default EventoSportCard

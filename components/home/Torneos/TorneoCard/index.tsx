import Badges from '@/components/SportCategories'
import OurTouchable from '@/components/Touchable'
import LabelValue from '@/components/ui/LabelValue'
import OurCard from '@/components/ui/ourCard'
import { SportHandler } from '@/controllers/sportHandler'
import { Tournament } from '@/models/tournament'
import { getLuxonDate } from '@/utils/date'
import { isIos } from '@tamagui/core'
import { XStack, YStack } from '@tamagui/stacks'
import { SizableText } from '@tamagui/text'
import { router } from 'expo-router'
import { Dimensions, Text } from 'react-native'
import SportIcon from '../../Rankings/Sport'

interface TorneoCardProps {
	data: Tournament
}
function TorneoCard({ data }: Readonly<TorneoCardProps>) {
	const handler = new SportHandler(data.sport_id).getHandler()
	const currentWidth = Dimensions.get('window').width

	const handlePress = () => {
		router.navigate({
			pathname: '/torneo',
			params: { tournamentId: data.tournament_id }
		})
	}

	return (
		<OurTouchable onPress={handlePress}>
			<OurCard
				style={{
					width: currentWidth - currentWidth * 0.1,
					alignItems: 'center',
					gap: 7
				}}
			>
				<YStack alignItems="center">
					<SizableText fontWeight={'900'} fontSize={isIos ? 16 : 20}>
						{data.tournament_desc}
					</SizableText>
					<SizableText fontSize={12} fontStyle="italic">
						Iniciado el{' '}
						{getLuxonDate(data.from_date).toFormat('dd/MM/yyyy')}
					</SizableText>
				</YStack>

				<XStack paddingHorizontal={10}>

					{handler?.renderTorneoNiveles(data.levels)}
				</XStack>

				<XStack gap={20}>
					<LabelValue label="Equipos" value={data.equipos} />
					{/* <LabelValue label="Fase" value="2" /> */}
				</XStack>

				<SportIcon
					sport={{
						sport_id: data.sport_id,
						sportdesc: data.sport_desc
					}}
					containerProps={{
						position: 'absolute',
						left: 5,
						top: -2,
						scale: 0.6
					}}
				/>
				<Badges
					data={data.branches.map((el) => ({
						id: el.sex_branch_id,
						desc: el.branch_desc
					}))}
					containerProps={{
						flexDirection: 'column',
						gap: 2,
						position: 'absolute',
						right: 5,
						top: 5,
						scale: isIos ? 0.75 : 0.9
					}}
					badgeProps={{
						badgeTextProps: {
							size: 'sm'
						}
					}}
				/>
			</OurCard>
		</OurTouchable>
	)
}

export default TorneoCard

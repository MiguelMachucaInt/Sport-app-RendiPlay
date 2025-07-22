import { colors } from '@/assets/colors/styles'
import { stylesProfile } from '@/assets/customStyles'
import AntDesign from '@expo/vector-icons/AntDesign'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import { JSX } from 'react'
import { Dimensions, ScrollView, Text, View } from 'react-native'

const SPORT_ICONS: Record<string, JSX.Element> = {
	WALLY: <FontAwesome5 name="volleyball-ball" size={36} color="#7573fc" />,
	FUTBOL: <FontAwesome name="soccer-ball-o" size={40} color="black" />,
	BASKETBALL: <FontAwesome5 name="basketball-ball" size={40} color="black" />,
	TENIS: <FontAwesome5 name="tennis-ball" size={40} color="black" />
}

interface StatItem {
	value: string
	icon: JSX.Element
	icon2: JSX.Element
	progress: number
	sportId: string
}

interface StatsComponentProps {
	dataStats?: any
}
function StatsComponent({
	dataStats,
	...props
}: Readonly<StatsComponentProps>) {
	const transformSportVictories = (): StatItem[] => {
		if (!dataStats || !dataStats || dataStats.length === 0) return []

		return dataStats.map((sport: any) => ({
			value: sport.count,
			icon: (
				<AntDesign
					name="star"
					size={34}
					color={colors.others.amarillo}
				/>
			),
			icon2: SPORT_ICONS[sport.sport_id] || (
				<FontAwesome name="question-circle" size={40} color="black" />
			),
			progress: calculateProgress(sport.count),
			sportId: sport.sport_id
		}))
	}

	const calculateProgress = (count: string): number => {
		const victories = parseInt(count, 10) || 0
		return Math.min(victories * 20, 100)
	}

	const statsItems: StatItem[] = transformSportVictories()

	const chunkArray = (arr: StatItem[], size: number): StatItem[][] => {
		return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
			arr.slice(i * size, i * size + size)
		)
	}

	const groupedStats = chunkArray(statsItems, 2)

	if (statsItems.length === 0) {
		return (
			<View style={stylesProfile.statsWrapper}>
				<Text style={{ textAlign: 'center', padding: 20 }}>
					No hay estadísticas disponibles
				</Text>
			</View>
		)
	}

	return (
		<View style={stylesProfile.statsWrapper}>
			<ScrollView
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={stylesProfile.sporsContainer}
				scrollEventThrottle={16}
			>
				{groupedStats.map((group, groupIndex) => (
					<View
						key={groupIndex}
						style={[
							stylesProfile.statsGroupContainer,
							{
								width:
									Dimensions.get('window').width * 0.48 - 20
							}
						]}
					>
						{group.map((item, index) => (
							<View key={index} style={stylesProfile.statItem}>
								<View style={stylesProfile.statRow}>
									{item.icon2}
									<Text style={stylesProfile.statValue}>
										{item.value}
									</Text>
									{item.icon}
								</View>
							</View>
						))}
					</View>
				))}
			</ScrollView>
		</View>
	)
}

export default StatsComponent

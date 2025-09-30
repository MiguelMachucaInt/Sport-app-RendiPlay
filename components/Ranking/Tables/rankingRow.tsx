import { colors } from '@/assets/colors/styles'
import { Ranking } from '@/services/rating'
import AntDesign from '@expo/vector-icons/AntDesign'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import { XStack, YStack } from '@tamagui/stacks'
import { StyleSheet, Text, View } from 'react-native'

const trendIcons = {
	up: <AntDesign name="caretup" size={16} color={colors.others.verde} />,
	down: <AntDesign name="caretdown" size={16} color={colors.others.rojo} />,
	equal: <FontAwesome5 name="equals" size={16} color="#fcba03" />
}

interface RankingRowProps {
	ranking: Ranking
	index: number
}

function RankingRow({ ranking, index }: Readonly<RankingRowProps>) {
	let rankingIcon
	if (ranking.last_position) {
		if (ranking.current_position > ranking.last_position) {
			rankingIcon = trendIcons.up
		} else if (ranking.current_position < ranking.last_position) {
			rankingIcon = trendIcons.down
		} else {
			rankingIcon = trendIcons.equal
		}
	}

	function getCategoryByPoints(points: string | number) {
		const pts = typeof points === 'string' ? parseInt(points, 10) : points
		if (pts < 1050) return 'NOVICE'
		if (pts >= 1050 && pts <= 1100) return 'CHALLENGER'
		if (pts > 1100) return 'PREMIER'
		return 'UNKNOWN'
	}
	return (
		<XStack
			style={{
				marginBottom: 12,
				paddingVertical: 8,
				backgroundColor: 'transparent'
			}}
		>
			<XStack width="80%" alignItems="center">
				<Text style={styles.positionNumber}>{index + 1}.</Text>
				<YStack gap={3} style={{ flex: 1 }}>
					<Text
						style={styles.teamName}
						numberOfLines={0}
						ellipsizeMode="tail"
					>
						{ranking.team_desc}
					</Text>
					<Text style={styles.categoryName}>
						({getCategoryByPoints(ranking.points)})
					</Text>
				</YStack>
				<View
					style={{
						marginLeft: 8,
						width: '20%',
						alignItems: 'center'
					}}
				>
					{rankingIcon}
				</View>
			</XStack>

			<View style={{ alignItems: 'center', width: '20%' }}>
				<Text style={styles.points}>{ranking.points}</Text>
			</View>
		</XStack>
	)
}

const styles = StyleSheet.create({
	positionNumber: {
		marginRight: 8,
		fontWeight: '600',
		fontSize: 12,
		color: '#444'
	},
	teamName: {
		fontSize: 13,
		flexWrap: 'wrap',
		flexShrink: 1
	},
	categoryName: {
		fontStyle: 'italic',
		fontSize: 10
	},
	points: {
		fontWeight: '800',
		fontSize: 16
	}
})

export default RankingRow

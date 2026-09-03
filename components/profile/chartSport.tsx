import { stylesProfile } from '@/assets/customStyles'
import { colors } from '@/assets/colors/styles'
import React, { useRef } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import OurCarousel from '../ourCarousel'

const SCREEN_WIDTH = Dimensions.get('window').width
const CHART_VIEWPORT_WIDTH = SCREEN_WIDTH - 40
const VISIBLE_POINTS = 6
const EXTRA_POINT_WIDTH = 56

interface ChartItem {
	name: string
	category: string
	currentPoints: string | number
	labels: string[]
	points: number[]
}

function SportChartCard({ sport }: Readonly<{ sport: ChartItem }>) {
	const scrollRef = useRef<ScrollView>(null)
	const chartWidth =
		CHART_VIEWPORT_WIDTH +
		Math.max(0, sport.points.length - VISIBLE_POINTS) * EXTRA_POINT_WIDTH

	return (
		<View style={stylesProfile.chartWrapper}>
			<View style={styles.cardHeader}>
				<View style={styles.titleContainer}>
					<Text style={styles.sportName}>{sport.name}</Text>
					<Text style={styles.categoryName}>
						{sport.category || 'Sin categoría'}
					</Text>
				</View>
				<View style={styles.pointsBadge}>
					<Text style={styles.pointsValue}>{sport.currentPoints}</Text>
					<Text style={styles.pointsLabel}>pts</Text>
				</View>
			</View>

			{sport.points.length ? (
				<>
					<Text style={styles.scrollHint}>
						Últimas 6 mediciones · Desliza para ver el historial
					</Text>
					<View style={styles.chartCard}>
						<ScrollView
							ref={scrollRef}
							horizontal
							nestedScrollEnabled
							onContentSizeChange={() =>
								scrollRef.current?.scrollToEnd({ animated: false })
							}
							showsHorizontalScrollIndicator
						>
							<LineChart
								data={{
									labels: sport.labels,
									datasets: [
										{
											data: sport.points,
											color: (opacity = 1) =>
												`rgba(247, 58, 39, ${opacity})`,
											strokeWidth: 3,
										},
									],
								}}
								width={chartWidth}
								height={220}
								yAxisSuffix=" pts"
								withInnerLines
								withOuterLines={false}
								chartConfig={{
									backgroundColor: '#ffffff',
									backgroundGradientFrom: '#ffffff',
									backgroundGradientTo: '#ffffff',
									decimalPlaces: 0,
									fillShadowGradientFrom: colors.primary.naranja,
									fillShadowGradientFromOpacity: 0.2,
									fillShadowGradientTo: colors.primary.naranja,
									fillShadowGradientToOpacity: 0.02,
									color: (opacity = 1) =>
										`rgba(247, 58, 39, ${opacity})`,
									labelColor: (opacity = 1) =>
										`rgba(55, 65, 81, ${opacity})`,
									propsForLabels: {
										fontSize: 10,
									},
									propsForDots: {
										r: '4',
										strokeWidth: '2',
										stroke: colors.primary.naranja,
										fill: '#ffffff',
									},
									propsForBackgroundLines: {
										strokeWidth: 1,
										stroke: '#E5E7EB',
										strokeDasharray: '4 6',
									},
								}}
								bezier
								style={styles.chart}
							/>
						</ScrollView>
					</View>
				</>
			) : (
				<View style={styles.emptyState}>
					<Text style={styles.emptyText}>Aún no hay historial de ELO.</Text>
				</View>
			)}
		</View>
	)
}

interface ChartSportProfileProps {
	dataHistorial?: any
	dataActual?: any
}
function ChartSportProfile({
	dataHistorial,
	dataActual
}: Readonly<ChartSportProfileProps>) {
	const processChartData = () => {
		const history = Array.isArray(dataHistorial) ? dataHistorial : []
		const currentPoints = Array.isArray(dataActual)
			? dataActual
			: dataActual?.sports_points ?? []

		return history.map((sport): ChartItem => {
			const currentSportData = currentPoints.find(
				(sp) => sp.sport_id === sport.sport_id
			) || {
				points: '0',
				sportdesc: sport.sportdesc,
				stars: 0
			}

			const historyData = Array.isArray(sport.history)
				? sport.history
				: []

			const groupedByMonth = historyData.reduce(
				(acc, item) => {
					if (item?.dateto) {
						const date = new Date(item.dateto)
						const key = `${date.getFullYear()}-${date.getMonth()}`
						const previousDate = acc[key]?.dateto
						if (!previousDate || date > new Date(previousDate)) acc[key] = item
					}
					return acc
				},
				{} as Record<string, any>
			)

			const groupedData = Object.values(groupedByMonth).sort((a, b) => {
				const dateA = new Date(a?.dateto)
				const dateB = new Date(b?.dateto)
				return dateA.getTime() - dateB.getTime()
			})

			const labels = groupedData.map((item) => {
				const date = new Date(item.dateto)
				return date
					.toLocaleDateString('es-ES', {
					month: 'short',
					day: '2-digit'
				})
					.replace('.', '')
			})

			const points = groupedData.map((item) =>
				parseInt(item?.puntuation || '0')
			)

			return {
				name: sport.sportdesc || 'Sin nombre',
				category: sport.category_desc || '',
				currentPoints: currentSportData.points || '0',
				labels,
				points,
			}
		})
	}

	const sportsData = processChartData()

	return (
		<OurCarousel
			baseStyle={{ marginTop: 10 }}
			data={sportsData}
			height={350}
			renderItem={({ item }) => {
				return <SportChartCard sport={item} />
			}}
		/>
	)
}

const styles = StyleSheet.create({
	cardHeader: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 12,
	},
	titleContainer: {
		flex: 1,
		paddingRight: 12,
	},
	sportName: {
		color: '#111827',
		fontSize: 18,
		fontWeight: '700',
	},
	categoryName: {
		color: '#6B7280',
		fontSize: 14,
		marginTop: 2,
	},
	pointsBadge: {
		alignItems: 'baseline',
		backgroundColor: '#FFF0EE',
		borderRadius: 14,
		flexDirection: 'row',
		gap: 3,
		paddingHorizontal: 10,
		paddingVertical: 6,
	},
	pointsValue: {
		color: colors.primary.naranja,
		fontSize: 17,
		fontWeight: '800',
	},
	pointsLabel: {
		color: '#9F2B20',
		fontSize: 11,
		fontWeight: '600',
	},
	scrollHint: {
		color: '#6B7280',
		fontSize: 11,
		marginBottom: 4,
		marginTop: 8,
		paddingHorizontal: 12,
	},
	chartCard: {
		backgroundColor: '#FFFFFF',
		borderColor: '#F1F5F9',
		borderRadius: 16,
		borderWidth: 1,
		elevation: 2,
		overflow: 'hidden',
		shadowColor: '#111827',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.08,
		shadowRadius: 5,
	},
	chart: {
		borderRadius: 16,
		paddingRight: 8,
	},
	emptyState: {
		alignItems: 'center',
		backgroundColor: '#F9FAFB',
		borderRadius: 16,
		marginHorizontal: 10,
		marginTop: 12,
		padding: 30,
	},
	emptyText: {
		color: '#6B7280',
		fontSize: 14,
	},
})

export default ChartSportProfile

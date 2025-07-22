import { stylesProfile } from '@/assets/customStyles'
import React from 'react'
import { Dimensions, Text, View } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import OurCarousel from '../ourCarousel'

interface ChartSportProfileProps {
	dataHistorial?: any
	dataActual?: any
}
function ChartSportProfile({
	dataHistorial,
	dataActual
}: Readonly<ChartSportProfileProps>) {

	const processChartData = () => {
		return dataHistorial.map((sport) => {
			const currentSportData = dataActual.sports_points?.find(
				(sp) => sp.sport_id === sport.sport_id
			) || {
				points: '0',
				sportdesc: sport.sportdesc,
				stars: 0
			}

			const historyData = Array.isArray(sport.history)
				? sport.history
				: []

			// Agrupar por mes
			const groupedByMonth = historyData.reduce(
				(acc, item) => {
					if (item?.dateto) {
						const date = new Date(item.dateto)
						const key = `${date.getFullYear()}-${date.getMonth()}` // Agrupamos por año y mes
						if (!acc[key]) {
							acc[key] = item // Usamos el primer valor del mes
						}
					}
					return acc
				},
				{} as Record<string, any>
			)

			// Convertir a array y ordenar cronológicamente
			const groupedData = Object.values(groupedByMonth).sort((a, b) => {
				const dateA = new Date(a?.dateto)
				const dateB = new Date(b?.dateto)
				return dateA.getTime() - dateB.getTime()
			})

			const labels = groupedData.map((item) =>
				new Date(item.dateto).toLocaleDateString('es-ES', {
					month: 'short',
					year: '2-digit'
				})
			)

			const points = groupedData.map((item) =>
				parseInt(item?.puntuation || '0')
			)

			return {
				name: sport.sportdesc || 'Sin nombre',
				category: sport.category_desc || '',
				currentPoints: currentSportData.points || '0',
				stars: currentSportData.stars || 0,
				data: {
					labels,
					datasets: [
						{
							data: points,
							color: (opacity = 1) =>
								`rgba(255, 0, 0, ${opacity})`,
							strokeWidth: 2
						}
					]
				}
			}
		})
	}

	const sportsData = processChartData()

	return (
		<OurCarousel
			baseStyle={{ marginTop: 10 }}
			data={sportsData}
			height={300}
			renderItem={({ item }) => {
				const sport = item
				return <View style={stylesProfile.chartWrapper}>
					<View style={stylesProfile.containerTitleChart}>
						<Text style={stylesProfile.chartTitle}>
							{sport.name} ({sport.category})
						</Text>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								columnGap: 4
							}}
						>
							{/* <Text style={{ fontSize: 18 }}>3</Text>
									<AntDesign
										name="star"
										size={24}
										color={colors.primary.naranja}
									/> */}
						</View>
					</View>
					<LineChart
						data={sport.data}
						width={Dimensions.get('window').width - 40}
						height={220}
						yAxisSuffix="pts"
						chartConfig={{
							backgroundColor: '#ffffff',
							backgroundGradientFrom: '#ffffff',
							backgroundGradientTo: '#ffffff',
							decimalPlaces: 0,
							color: (opacity = 1) =>
								`rgba(255, 0, 0, ${opacity})`,
							labelColor: (opacity = 1) =>
								`rgba(0, 0, 0, ${opacity})`,
							style: { borderRadius: 16 },
							propsForDots: {
								r: '6',
								strokeWidth: '2',
								stroke: '#ff0000',
								fill: '#ffffff'
							},
							propsForBackgroundLines: {
								strokeWidth: 1,
								stroke: 'rgba(0, 0, 0, 0.1)'
							}
						}}
						bezier
						style={stylesProfile.chartStyle}
					/>
				</View>
			}}
		/>
	)

}

export default ChartSportProfile

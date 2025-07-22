import Loading from '@/components/Loading'
import OurTouchable from '@/components/Touchable'
import OurButton from '@/components/ui/ourButton'
import { SportHandler } from '@/controllers/sportHandler'
import PuntuacionesService from '@/services/puntuacion'
import { mergeStyles } from '@/utils/styles'
import { YStack } from '@tamagui/stacks'
import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import { useMemo, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface TablaPuntuacionesProps {}

function TablaPuntuaciones({ ...props }: Readonly<TablaPuntuacionesProps>) {
	const { tournamentId } = useLocalSearchParams<{ tournamentId: string }>()
	const [refreshing, setRefreshing] = useState(false)

	const [categoriaActual, setCategoriaActual] = useState('PREMIER')
	const [sexoActual, setSexoActual] = useState('DAMAS')

	const { data, isFetching, refetch } = useQuery({
		queryKey: ['puntuacion', tournamentId],
		queryFn: () =>
			tournamentId ? PuntuacionesService.getPuntuacion(tournamentId) : []
	})

	function handleRefresh() {
		setRefreshing(true)
		refetch().finally(() => setRefreshing(false))
	}
	const categorias = useMemo(() => {
		const set = new Set<string>()
		data?.forEach((item) => {
			const [cat] = item.category_desc.split(' - ')
			set.add(cat)
		})

		const order =
			data?.[0]?.tournament_type === 'WALLY_TOURNAMENT'
				? ['PREMIER', 'CHALLENGER', 'NOVICE']
				: []

		return Array.from(set).sort((a, b) => {
			const indexA = order.indexOf(a.toUpperCase())
			const indexB = order.indexOf(b.toUpperCase())

			if (indexA !== -1 && indexB !== -1) return indexA - indexB

			if (indexA !== -1) return -1
			if (indexB !== -1) return 1

			return a.localeCompare(b)
		})
	}, [data])

	const sexos = useMemo(() => {
		const set = new Set<string>()
		data?.forEach((item) => {
			const [, sex] = item.category_desc.split(' - ')
			set.add(sex)
		})
		return Array.from(set)
	}, [data])

	const tournamentType =
		data?.[0]?.tournament_type === 'WALLY_TOURNAMENT' ? 'WALLY' : 'futbol'

	const handler = new SportHandler(tournamentType).getHandler()

	const dataFiltrada = useMemo(() => {
		if (!Array.isArray(data)) return []
		let filtered = data.filter((item) => {
			const [cat, sex] = item.category_desc.split(' - ')
			return cat === categoriaActual && sex === sexoActual
		})
		filtered.sort((a, b) => {
			if (Number(b.resultpoints) !== Number(a.resultpoints)) {
				return Number(b.resultpoints) - Number(a.resultpoints)
			}

			const diffSetsA =
				(Number(a.setGanados) || 0) - (Number(a.setPerdidos) || 0)
			const diffSetsB =
				(Number(b.setGanados) || 0) - (Number(b.setPerdidos) || 0)

			if (diffSetsA !== diffSetsB) {
				return diffSetsB - diffSetsA
			}

			const diffPointsA =
				(Number(a.puntosGanados) || 0) - (Number(a.puntosPerdidos) || 0)
			const diffPointsB =
				(Number(b.puntosGanados) || 0) - (Number(b.puntosPerdidos) || 0)

			if (diffPointsA !== diffPointsB) {
				return diffPointsB - diffPointsA
			}

			return 0
		})

		return filtered
	}, [data, categoriaActual, sexoActual])

	return !isFetching ? (
		<YStack
			style={{
				marginBottom: 450,
				marginTop: 10,
				backgroundColor: 'transparent'
			}}
		>
			<View
				style={{
					marginVertical: 8
				}}
			>
				<View
					style={{
						flexDirection: 'row',
						flexWrap: 'wrap',
						justifyContent: 'center',
						gap: 6,
						paddingHorizontal: 8,
						marginBottom: 8
					}}
				>
					{categorias.map((cat) => {
						const isSelected = cat === categoriaActual
						const color = cat.toUpperCase().includes('PREMIER')
							? '#fcba03'
							: cat.toUpperCase().includes('CHALLENGER')
								? '#2a5bb0'
								: cat.toUpperCase().includes('NOVICE')
									? '#32a852'
									: ''
						return (
							<View key={cat}>
								<OurTouchable
									onPress={() => setCategoriaActual(cat)}
									style={mergeStyles(styles.button, {
										backgroundColor: isSelected
											? color
											: 'white'
									})}
								>
									<Text
										style={{
											color: isSelected
												? 'white'
												: 'black',
											fontWeight: '600'
										}}
									>
										{cat}
									</Text>
								</OurTouchable>
							</View>
						)
					})}
				</View>
			</View>

			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-evenly',
					gap: 3
				}}
			>
				{sexos.map((sexo) => {
					const isSelectedSexos = sexo === sexoActual
					return (
						<View key={sexo}>
							<OurButton
								onPress={() => setSexoActual(sexo)}
								variant={isSelectedSexos ? 'solid' : 'outline'}
							>
								{sexo}
							</OurButton>
						</View>
					)
				})}
			</View>
			{handler?.renderTablaDePosiciones({
				data: dataFiltrada,
				refreshing,
				onRefresh: handleRefresh
			})}
		</YStack>
	) : (
		<Loading flex={0} />
	)
}

const styles = StyleSheet.create({
	button: {
		paddingVertical: 10,
		paddingHorizontal: 30,
		borderRadius: 10
	}
})

export default TablaPuntuaciones

import Loading from '@/components/Loading'
import OurTouchable from '@/components/Touchable'
import OurButton from '@/components/ui/ourButton'
import { SportHandler } from '@/controllers/sportHandler'
import PuntuacionesService from '@/services/puntuacion'
import CategorySexService from '@/services/sexbranch'
import { mergeStyles } from '@/utils/styles'
//import { YStack } from '@tamagui/stacks'
import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useMemo, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

interface TablaPuntuacionesProps {}

function TablaPuntuaciones({ ...props }: Readonly<TablaPuntuacionesProps>) {
	const { tournamentId } = useLocalSearchParams<{ tournamentId: string }>()
	const [refreshing, setRefreshing] = useState(false)

	const [categoriaActual, setCategoriaActual] = useState('')
	const [sexoActual, setSexoActual] = useState('')

	const { data, isFetching, refetch } = useQuery({
		queryKey: ['puntuacion', tournamentId],
		queryFn: () =>
			tournamentId ? PuntuacionesService.getPuntuacion(tournamentId) : []
	})

	const { data: categoriesWithSex } = useQuery({
		queryKey: ['categoriesWithSex', tournamentId],
		queryFn: () => CategorySexService.getSexBranches(tournamentId),
		enabled: !!tournamentId
	})

	useEffect(() => {
		if (
			categoriesWithSex?.length &&
			!categoriesWithSex.includes(sexoActual)
		) {
			setSexoActual(categoriesWithSex[0] as string)
		}
	}, [categoriesWithSex])

	function getCategoryColor(cat: string) {
		const catUpper = cat.toUpperCase()
		if (catUpper.includes('PREMIER')) return '#fcba03' // amarillo
		if (catUpper.includes('CHALLENGER')) return '#2a5bb0' // azul
		if (catUpper.includes('NOVICE')) return '#32a852' // verde
		if (catUpper.includes('SERIE A')) return '#fcba03' // amarillo como ejemplo
		if (catUpper.includes('SERIE B')) return '#2a5bb0' // azul
		return '#888' // gris oscuro
	}
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

	const tournamentType =
		data?.[0]?.tournament_type === 'WALLY_TOURNAMENT' ? 'WALLY' : 'futbol'

	const handler = new SportHandler(tournamentType).getHandler()

	const dataFiltrada = useMemo(() => {
		if (!Array.isArray(data)) return []

		let filtered = data.filter((item: any) => {
			if (!item.category_desc) return false

			const parts = item.category_desc.split(' - ')
			const cat = parts[0]?.trim().toUpperCase()
			const sex = parts[1]?.trim().toUpperCase() || 'MIXTO'

			if (cat !== categoriaActual.trim().toUpperCase()) return false
			if (sex === 'MIXTO') return true

			return sex === sexoActual.trim().toUpperCase()
		})

		filtered.sort((a, b) => {
			if (Number(b.resultpoints) !== Number(a.resultpoints)) {
				return Number(b.resultpoints) - Number(a.resultpoints)
			}
			const diffSetsA =
				(Number(a.setGanados) || 0) - (Number(a.setPerdidos) || 0)
			const diffSetsB =
				(Number(b.setGanados) || 0) - (Number(b.setPerdidos) || 0)
			if (diffSetsA !== diffSetsB) return diffSetsB - diffSetsA
			const diffPointsA =
				(Number(a.puntosGanados) || 0) - (Number(a.puntosPerdidos) || 0)
			const diffPointsB =
				(Number(b.puntosGanados) || 0) - (Number(b.puntosPerdidos) || 0)
			if (diffPointsA !== diffPointsB) return diffPointsB - diffPointsA
			return 0
		})

		return filtered
	}, [data, categoriaActual, sexoActual])

	useEffect(() => {
		if (categorias.length && !categoriaActual) {
			setCategoriaActual(categorias[0])
		}
	}, [categorias])

	useEffect(() => {
		if (categoriesWithSex?.length && !sexoActual) {
			setSexoActual(categoriesWithSex[0] as string)
		}
	}, [categoriesWithSex])
	return !isFetching ? (
		<ScrollView
			style={{
				marginBottom: 350,
				marginTop: 10,
				backgroundColor: 'transparent'
			}}
		>
			<View
				style={{
					marginVertical: 8
				}}
			>
				<ScrollView
					horizontal={categorias.length > 3}
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{
						flexDirection: 'row',
						justifyContent:
							categorias.length <= 3 ? 'center' : 'flex-start',
						gap: 6,
						paddingHorizontal: 8,
						marginBottom: 8,
						flexGrow: categorias.length <= 3 ? 1 : 0
					}}
				>
					{categorias.map((cat) => {
						const isSelected = cat === categoriaActual
						const color = getCategoryColor(cat)
						return (
							<OurTouchable
								key={cat}
								onPress={() => setCategoriaActual(cat)}
								style={mergeStyles(styles.button, {
									backgroundColor: isSelected
										? color
										: 'white'
								})}
							>
								<Text
									style={{
										color: isSelected ? 'white' : 'black',
										fontWeight: '600',
										fontSize: 12
									}}
									numberOfLines={1}
								>
									{cat}
								</Text>
							</OurTouchable>
						)
					})}
				</ScrollView>
			</View>

			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-evenly',
					gap: 3
				}}
			>
				{categoriesWithSex?.map((sexo) => {
					const isSelectedSexos = sexo === sexoActual
					return (
						<View key={sexo as string}>
							<OurButton
								onPress={() => setSexoActual(sexo as string)}
								variant={isSelectedSexos ? 'solid' : 'outline'}
								style={{
									paddingVertical: 2,
									paddingHorizontal: 10,
									minWidth: 50
								}}
							>
								{sexo as string}
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
		</ScrollView>
	) : (
		<Loading flex={0} />
	)
}

const styles = StyleSheet.create({
	button: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 8,
		minWidth: 100,
		alignItems: 'center'
	}
})

export default TablaPuntuaciones

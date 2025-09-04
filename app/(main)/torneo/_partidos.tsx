import { colors } from '@/assets/colors/styles'
import Loading from '@/components/Loading'
import CardPartidos from '@/components/Torneo/Partidos/CardPartidos'
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input'
import OurButton from '@/components/ui/ourButton'
import PartidosService from '@/services/partidos'
import AntDesign from '@expo/vector-icons/AntDesign'
import { YStack } from '@tamagui/stacks'
import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import { useMemo, useState } from 'react'
import {
	FlatList,
	Platform,
	RefreshControl,
	TextInput,
	View
} from 'react-native'

function PartidosTab() {
	const { tournamentId } = useLocalSearchParams<{ tournamentId: string }>()
	const [refreshing, setRefreshing] = useState(false)
	const { data, isLoading, isRefetching, refetch } = useQuery({
		queryKey: ['matches', tournamentId],
		queryFn: () => PartidosService.getPartidos(tournamentId)
	})

	const [searchQuery, setSearchQuery] = useState('')
	const [filterType, setFilterType] = useState<
		'all' | 'pending' | 'finished'
	>('all')

	const handleRefresh = async () => {
		setRefreshing(true)
		try {
			await refetch()
		} finally {
			setRefreshing(false)
		}
	}

	// Ordena los partidos por fecha (más reciente primero)
	const sortedData = useMemo(() => {
		if (!data) return []
		return [...data].sort((a, b) => {
			const dateA = new Date(a.matchdate).getTime()
			const dateB = new Date(b.matchdate).getTime()
			return dateB - dateA // Orden descendente
		})
	}, [data])

	const filteredData = useMemo(() => {
		let result = sortedData

		// aplicar filtro por estado
		if (filterType === 'pending') {
			result = result.filter((m) => m.state !== 'F')
		} else if (filterType === 'finished') {
			result = result.filter((m) => m.state === 'F')
		}

		// aplicar búsqueda
		if (searchQuery) {
			const term = searchQuery.toLowerCase()
			result = result.filter(
				(match) =>
					match.team1.toLowerCase().includes(term) ||
					match.team2.toLowerCase().includes(term)
			)
		}

		return result
	}, [sortedData, filterType, searchQuery])

	return !isLoading && !refreshing ? (
		<YStack style={{ marginBottom: 240 }}>
			{/* Botones de filtro */}
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
					gap: 8,
					padding: 10
				}}
			>
				<OurButton
					onPress={() => setFilterType('pending')}
					variant={filterType === 'pending' ? 'solid' : 'outline'}
				>
					Por jugar
				</OurButton>

				<OurButton
					onPress={() => setFilterType('finished')}
					variant={filterType === 'finished' ? 'solid' : 'outline'}
				>
					Finalizados
				</OurButton>
			</View>
			{Platform.OS === 'web' ? (
				<View>
					<TextInput
						placeholder="Buscar por equipo..."
						value={searchQuery}
						onChangeText={setSearchQuery}
						//   style={styles.webInput}
					/>
					<AntDesign
						name="search1"
						size={16}
						color={colors.primary.naranja}
						//   style={styles.webSearchIcon}
					/>
				</View>
			) : (
				<Input
					size="md"
					variant="rounded"
					style={{
						width: '100%',
						borderColor: colors.primary.naranja,
						height: 40,
						backgroundColor: 'white'
					}}
				>
					<InputSlot style={{ paddingLeft: 10 }}>
						<InputIcon
							as={() => (
								<AntDesign
									name="search1"
									size={16}
									color={colors.primary.naranja}
								/>
							)}
						/>
					</InputSlot>
					<InputField
						placeholder="Buscar por equipo..."
						value={searchQuery}
						onChangeText={setSearchQuery}
					/>
				</Input>
			)}

			<FlatList
				data={filteredData}
				keyExtractor={(item) => item.match_id}
				renderItem={({ item }) => {
					const partido = item
					return (
						<CardPartidos
							key={partido.match_id}
							fechaPartido={partido.matchdate}
							equipo1={partido.team1}
							equipo2={partido.team2}
							walkover={partido.walkover}
							puntosEquipo1={partido.resultpoints1}
							puntosEquipo2={partido.resultpoints2}
							puntosElo={partido.elo_points}
							categoria={partido.category_desc}
							state={item.state}
						/>
					)
				}}
				refreshControl={
					<RefreshControl
						refreshing={refreshing || isRefetching}
						onRefresh={handleRefresh}
					/>
				}
				contentContainerStyle={{
					paddingTop: 10,
					paddingHorizontal: 5,
					paddingBottom: 400
				}}
			/>
		</YStack>
	) : (
		<Loading flex={0} />
	)
}

export default PartidosTab

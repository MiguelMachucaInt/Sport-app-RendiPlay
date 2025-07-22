import { colors } from '@/assets/colors/styles'
import Loading from '@/components/Loading'
import CardPartidos from '@/components/Torneo/Partidos/CardPartidos'
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input'
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
		if (searchQuery) {
			return sortedData?.filter((match) => {
				const term = searchQuery.toLowerCase()
				return (
					match.team1.toLowerCase().includes(term) ||
					match.team2.toLowerCase().includes(term)
				)
			})
		}
		return sortedData // Usa los datos ordenados
	}, [sortedData, searchQuery])

	return !isLoading && !refreshing ? (
		<YStack style={{ marginBottom: 240 }}>
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
					paddingBottom: 120
				}}
			/>
		</YStack>
	) : (
		<Loading flex={0} />
	)
}

export default PartidosTab

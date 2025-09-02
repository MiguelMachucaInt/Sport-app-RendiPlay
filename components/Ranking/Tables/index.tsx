import { colors } from '@/assets/colors/styles'
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input'
import { Ranking } from '@/services/rating'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useMemo, useState } from 'react'
import {
	FlatList,
	RefreshControl,
	Text,
	TouchableOpacity,
	View
} from 'react-native'
import RankingRow from './rankingRow'

interface TablaPuntuacionesProps {
	data: Ranking[]
	refreshing: boolean
	onRefresh: () => void
	tipo?: string
}

function TablaRanking({
	tipo,
	data,
	refreshing,
	onRefresh
}: TablaPuntuacionesProps) {
	const [searchQuery, setSearchQuery] = useState('')
	const [selectedBranch, setSelectedBranch] = useState<string | null>(null)
	const [selectedCategory, setSelectedCategory] = useState<string | null>(
		null
	)

	// Obtener las ramas únicas
	const branches = useMemo(() => {
		const unique = Array.from(new Set(data.map((d) => d.branch_desc)))
		return unique
	}, [data])

	// Obtener las categorías únicas de la rama seleccionada
	const categories = useMemo(() => {
		if (!selectedBranch) return []
		const unique = Array.from(
			new Set(
				data
					.filter((d) => d.branch_desc === selectedBranch)
					.map((d) => d.category_desc)
			)
		)
		return unique
	}, [data, selectedBranch])

	// Filtrado final de los datos
	const filteredData = useMemo(() => {
		let ordered = data
		if (selectedBranch) {
			ordered = ordered.filter((d) => d.branch_desc === selectedBranch)
		}
		if (selectedCategory) {
			ordered = ordered.filter(
				(d) => d.category_desc === selectedCategory
			)
		}
		if (searchQuery) {
			ordered = ordered.filter((d) =>
				d.team_desc.toLowerCase().includes(searchQuery.toLowerCase())
			)
		}
		ordered.sort((a, b) => Number(b.points) - Number(a.points))
		return ordered
	}, [data, selectedBranch, selectedCategory, searchQuery])

	return (
		<View style={{ marginTop: 20, flex: 1 }}>
			{/* Buscador */}
			<Input
				size="md"
				style={{ marginBottom: 16, backgroundColor: 'white' }}
				variant="rounded"
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
					placeholder={`Buscar por ${tipo}...`}
					value={searchQuery}
					onChangeText={setSearchQuery}
				/>
			</Input>

			{/* Botones de ramas */}
			<View
				style={{
					flexDirection: 'row',
					marginBottom: 8,
					justifyContent: 'space-between'
				}}
			>
				{branches.map((branch) => (
					<TouchableOpacity
						key={branch}
						style={{
							paddingVertical: 8,
							paddingHorizontal: 16,
							marginRight: 8,
							backgroundColor:
								selectedBranch === branch
									? colors.primary.naranja
									: 'lightgray',
							borderRadius: 4,
							minWidth: 80,
							alignItems: 'center'
						}}
						onPress={() => {
							setSelectedBranch(branch)
							setSelectedCategory(null) // reset categoria al cambiar rama
						}}
					>
						<Text
							style={{
								color:
									selectedBranch === branch
										? 'white'
										: 'black'
							}}
						>
							{branch}
						</Text>
					</TouchableOpacity>
				))}
			</View>

			{/* Botones de categorías */}
			{selectedBranch && (
				<View
					style={{
						flexDirection: 'row',
						marginBottom: 16,
						flexWrap: 'wrap'
					}}
				>
					{categories.map((category) => (
						<TouchableOpacity
							key={category}
							style={{
								padding: 6,
								marginRight: 8,
								marginBottom: 8,
								backgroundColor:
									selectedCategory === category
										? colors.primary.naranja
										: 'lightgray',
								borderRadius: 4
							}}
							onPress={() => setSelectedCategory(category)}
						>
							<Text
								style={{
									color:
										selectedCategory === category
											? 'white'
											: 'black'
								}}
							>
								{category}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			)}

			{/* Header */}
			<View style={{ flexDirection: 'row', marginBottom: 16 }}>
				<Text style={{ flex: 4, fontWeight: '800', fontSize: 16 }}>
					{tipo}
				</Text>
				<Text
					style={{
						flex: 1,
						fontWeight: '800',
						fontSize: 16,
						textAlign: 'center'
					}}
				>
					Puntos
				</Text>
			</View>

			{/* Lista */}
			<FlatList
				data={filteredData}
				renderItem={({ item, index }) => (
					<RankingRow ranking={item} index={index} />
				)}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}
				contentContainerStyle={{ paddingBottom: 40 }}
			/>
		</View>
	)
}

export default TablaRanking

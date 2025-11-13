import { colors } from '@/assets/colors/styles'
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input'
import { Ranking } from '@/services/rating'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useMemo, useState } from 'react'
import { FlatList, RefreshControl, Text, View } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import RankingRow from './rankingRow'

interface TablaPuntuacionesProps {
	data: Ranking[]
	refreshing: boolean
	onRefresh: () => void
	tipo?: string
	selectedCategory: string | null
	setSelectedCategory: (cat: string | null) => void
}

function TablaRanking({
	tipo,
	data,
	refreshing,
	onRefresh,
	selectedCategory,
	setSelectedCategory
}: TablaPuntuacionesProps) {
	const [searchQuery, setSearchQuery] = useState('')

	const allCategories = useMemo(() => {
		const unique = Array.from(new Set(data.map((d) => d.category_desc)))
		return unique.sort((a, b) => a.localeCompare(b))
	}, [data])

	const filteredData = useMemo(() => {
		if (!selectedCategory) return []
		let ordered = data.filter((d) => d.category_desc === selectedCategory)

		if (searchQuery) {
			ordered = ordered.filter((d) =>
				d.team_desc.toLowerCase().includes(searchQuery.toLowerCase())
			)
		}
		ordered.sort((a, b) => Number(b.points) - Number(a.points))
		return ordered
	}, [data, selectedCategory, searchQuery])

	return (
		<View style={{ marginTop: 15, flex: 1 }}>
			{/* Buscador arriba */}
			<Input
				size="md"
				style={{ marginBottom: 10, backgroundColor: 'white' }}
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

			{/* ComboBox de Categorías */}
			<View
				style={{
					marginBottom: 10,
					backgroundColor: 'white',
					borderRadius: 9999,
					borderWidth: 1,
					borderColor: '#ccc',
					paddingHorizontal: 15,
					height: 40,
					justifyContent: 'center'
				}}
			>
				<RNPickerSelect
					placeholder={{
						label: 'Seleccione una categoría',
						value: null,
						color: 'gray',
						fontSize: 18
					}}
					onValueChange={(value) => setSelectedCategory(value)}
					value={selectedCategory}
					items={allCategories.map((c) => ({ label: c, value: c }))}
					style={{
						inputIOS: {
							color: selectedCategory ? 'black' : 'gray',
							fontSize: 14
						},
						inputAndroid: {
							color: selectedCategory ? 'black' : 'gray',
							fontSize: 14
						}
					}}
					useNativeAndroidPickerStyle={false}
				/>
			</View>

			{/* Header */}
			{selectedCategory && (
				<View style={{ flexDirection: 'row', marginBottom: 12 }}>
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
			)}

			{/* Lista */}
			<FlatList
				data={filteredData}
				renderItem={({ item, index }) => (
					<RankingRow ranking={item} index={index} />
				)}
				keyExtractor={(item, index) => index.toString()}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}
				contentContainerStyle={{
					paddingBottom: 40,
					flexGrow: 1,
					justifyContent:
						filteredData.length === 0 ? 'center' : 'flex-start'
				}}
				ListEmptyComponent={
					selectedCategory ? (
						<Text style={{ textAlign: 'center', color: 'gray' }}>
							No hay datos en esta categoría
						</Text>
					) : (
						<Text style={{ textAlign: 'center', color: 'gray' }}>
							Seleccione una categoría para ver resultados
						</Text>
					)
				}
			/>
		</View>
	)
}

export default TablaRanking

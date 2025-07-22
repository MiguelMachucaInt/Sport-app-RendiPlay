import { colors } from '@/assets/colors/styles'
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input'
import { Ranking } from '@/services/rating'
import { mergeStyles } from '@/utils/styles'
import AntDesign from '@expo/vector-icons/AntDesign'
import { XStack } from '@tamagui/stacks'
import { useMemo, useState } from 'react'
import {
	FlatList,
	RefreshControl,
	ScrollViewProps,
	StyleProp,
	Text,
	View,
	ViewStyle
} from 'react-native'
import RankingRow from './rankingRow'

interface TablaPuntuacionesProps {
	data: Ranking[]
	refreshing: boolean
	onRefresh: () => void
	tipo?: string
	scrollViewProps?: ScrollViewProps
	containerStyle?: StyleProp<ViewStyle>
}
function TablaRanking({
	tipo,
	data,
	containerStyle,
	refreshing,
	onRefresh
}: Readonly<TablaPuntuacionesProps>) {
	const [searchQuery, setSearchQuery] = useState('')

	const filteredData = useMemo(() => {
		let ordered = data
		if (searchQuery) {
			ordered = data.filter((item) =>
				item.team_desc.toLowerCase().includes(searchQuery.toLowerCase())
			)
		}
		ordered.sort((a, b) => Number(b.points) - Number(a.points))
		return ordered
	}, [data, searchQuery])

	return (
		<View style={mergeStyles(containerStyle, { marginTop: 20, flex: 1 })}>
			<Input
				size="md"
				style={{
					width: '100%',
					borderColor: colors.primary.naranja,
					height: 40,
					marginBottom: 16,
					backgroundColor: 'white'
				}}
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
					style={{ paddingLeft: 4 }}
				/>
			</Input>

			<XStack style={{ marginBottom: 16 }}>
				<View style={{ flex: 4, alignItems: 'center' }}>
					<Text style={{ fontWeight: '800', fontSize: 16 }}>
						{tipo}
					</Text>
				</View>
				<View style={{ flex: 1, alignItems: 'center' }}>
					<Text style={{ fontWeight: '800', fontSize: 16 }}>
						Puntos
					</Text>
				</View>
			</XStack>

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
				contentContainerStyle={{
					paddingBottom: 40
				}}
			/>
		</View>
	)
}

export default TablaRanking

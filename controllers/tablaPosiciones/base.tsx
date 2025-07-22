import { colors } from '@/assets/colors/styles'
import { ShadowScrollView } from '@/components/ShadowScrollView'
import { Builder } from '@/utils/interfaces'
import AntDesign from '@expo/vector-icons/AntDesign'
import { XStack, YStack } from '@tamagui/stacks'
import { ReactNode } from 'react'
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'

const { width: screenWidth } = Dimensions.get('window')
const TEAM_COLUMN_WIDTH = screenWidth * 0.4

export abstract class TablaPosicionesBuilder implements Builder<ReactNode> {
	getResult({
		data,
		refreshing,
		onRefresh
	}: {
		data: any[]
		refreshing: boolean
		onRefresh: () => void
	}): ReactNode {
		return (
			<XStack>
				<View style={{ width: TEAM_COLUMN_WIDTH }}>
					<View style={[styles.teamHeader, styles.headerContainer]}>
						<Text style={styles.headerText}>EQUIPO</Text>
					</View>

					<FlatList
						data={data}
						keyExtractor={(item) => item.team_id.toString()}
						renderItem={({ item, index }) => (
							<XStack
								style={[
									styles.teamCell,
									{ width: '100%', alignItems: 'center' }
								]}
							>
								<Text style={styles.positionNumber}>
									{index + 1}.
								</Text>
								<ShadowScrollView
									horizontal
									showsHorizontalScrollIndicator={false}
									containerStyles={{ flex: 1 }}
								>
									<YStack gap={1}>
										<Text style={styles.teamName}>
											{item.team_desc}
										</Text>
									</YStack>
									<Text></Text>
								</ShadowScrollView>
							</XStack>
						)}
						contentContainerStyle={styles.listContent}
						refreshing={refreshing}
						onRefresh={onRefresh}
						scrollEnabled={false}
					/>
				</View>
				<XStack width={'58%'} alignItems="center">
					<ShadowScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						containerStyles={{ flex: 1 }}
					>
						<YStack>
							<XStack
								style={[
									styles.columnsContainer,
									styles.headerContainer
								]}
							>
								{this.setColumnas()}
							</XStack>
							<FlatList
								data={data}
								keyExtractor={(item) => item.team_id.toString()}
								renderItem={({ item }) => (
									<XStack style={styles.columnsContainer}>
										{this.setFila(item)}
									</XStack>
								)}
								contentContainerStyle={styles.listContent}
								refreshing={refreshing}
								onRefresh={onRefresh}
								scrollEnabled={false}
							/>
						</YStack>
					</ShadowScrollView>
				</XStack>
			</XStack>
		)
	}

	protected abstract setColumnas(): ReactNode
	protected abstract setFila(row): ReactNode

	private setFilaCommon(row, index: number): ReactNode {
		const trendIcons = {
			up: (
				<AntDesign
					name="caretup"
					size={16}
					color={colors.others.verde}
				/>
			),
			down: (
				<AntDesign
					name="caretdown"
					size={16}
					color={colors.others.rojo}
				/>
			),
			equal: <AntDesign name="minus" size={20} color={'#616160'} />
		}

		return (
			<XStack>
				<Text>{index + 1}.</Text>
				<Text>{row.team_desc}</Text>
				<View style={styles.trendIcon}>{trendIcons[row.trend]}</View>
				<View>{this.setFila(row)}</View>
			</XStack>
		)
	}
}

const styles = StyleSheet.create({
	headerContainer: {
		alignItems: 'center',
		paddingLeft: 8,
		gap: 4,
	},
	teamHeader: {
		alignItems: 'flex-start',
		paddingLeft: 8
	},
	headerText: {
		fontWeight: '800',
		fontSize: 14,
		marginTop: 16
	},
	listContent: {
		paddingHorizontal: 8,
	},
	teamCell: {
		paddingLeft: 8,
		marginRight: 12
	},
	positionNumber: {
		marginRight: 8,
		fontWeight: '600',
		fontSize: 12,
		marginTop: 27,
		color: '#444'
	},
	teamName: {
		fontSize: 14,
		color: '#222',
		flexShrink: 1,
		marginTop: 27,
		fontWeight: '500'
	},
	trendIcon: {
		marginLeft: 8
	},
	columnsContainer: {
		flexDirection: 'row',
		paddingVertical: 12,
		gap: 4,
	}
})

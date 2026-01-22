import { colors } from '@/assets/colors/styles'
import TablaRanking from '@/components/Ranking/Tables'
import OurBadge from '@/components/ui/OurBadge'
import OurTabs from '@/components/ui/OurTabs'
import { Level } from '@/models/tournament'
import { XStack } from '@tamagui/stacks'
import { ReactNode } from 'react'
import { Sport } from './base'
import { TablaPosicionesWallyBuilder } from './tablaPosiciones/wally'

export class WallySport extends Sport {
	renderRanking({
		data,
		refreshing,
		onRefresh,
		selectedCategory,
		setSelectedCategory
	}): ReactNode {
		return (
			<OurTabs
				defaultValue="clubes"
				scrollViewProps={{
					contentContainerStyle: { justifyContent: 'center' }
				}}
				tabs={[
					{
						label: 'Clubes',
						content: (
							<TablaRanking
								tipo="Clubes"
								data={data.Clubs}
								refreshing={refreshing}
								onRefresh={onRefresh}
								selectedCategory={selectedCategory}
								setSelectedCategory={setSelectedCategory}
							/>
						),
						tabKey: 'clubes'
					},
					{
						label: 'Jugadores',
						content: (
							<TablaRanking
								tipo="Jugadores"
								data={data.Global}
								refreshing={refreshing}
								onRefresh={onRefresh}
								selectedCategory={selectedCategory}
								setSelectedCategory={setSelectedCategory}
							/>
						),
						tabKey: 'jugadores'
					},
					{
						label: 'Equipos',
						content: (
							<TablaRanking
								tipo="Equipos"
								data={data.Equipos}
								refreshing={refreshing}
								onRefresh={onRefresh}
								selectedCategory={selectedCategory}
								setSelectedCategory={setSelectedCategory}
							/>
						),
						tabKey: 'equipos'
					}
				]}
				style={{ flex: 1 }}
				tabContentProps={{ flex: 1 }}
			/>
		)
	}

	renderTablaDePosiciones(args?: any): ReactNode {
		return new TablaPosicionesWallyBuilder().getResult(args)
	}

	renderTorneoNiveles(niveles: Level[]): ReactNode {
		const nivelesStyles = {
			CHALLENGER: {
				backgroundColor: colors.others.azul,
				textColor: 'white'
			},
			NOVICE: {
				backgroundColor: colors.others.verde2,
				textColor: 'white'
			},
			PREMIER: {
				backgroundColor: colors.others.amarillo2,
				textColor: 'black'
			}
		}
		return (
		<XStack
			gap={4}
			rowGap={4}
			flexWrap="wrap"
			justifyContent="center"
			alignItems="center"
			flex={1}
		>
			{niveles.map((niv) => {
			const key = niv.level_desc?.toUpperCase?.() || ''
			const styles = nivelesStyles[key] || {
				backgroundColor: 'gray',
				textColor: 'white',
			}

			return (
				<OurBadge
				key={niv.level_id}
				text={niv.level_desc}
				style={{
					backgroundColor: styles.backgroundColor,
					borderWidth: 0,
				}}
				badgeTextProps={{
					style: {
					color: styles.textColor,
					},
				}}
				/>
			)
			})}
		</XStack>
		)

	}
}

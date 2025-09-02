import {
	Accordion,
	AccordionContent,
	AccordionContentText,
	AccordionHeader,
	AccordionIcon,
	AccordionItem,
	AccordionTitleText,
	AccordionTrigger
} from '@/components/ui/accordion'
import AntDesign from '@expo/vector-icons/AntDesign'
import { XStack, YStack } from '@tamagui/stacks'
import { useState } from 'react'
import CardPartidos from '../CardPartidos'

interface Partido {
	match_id: string
	matchdate: string
	state: string
	state_desc: string
	team1: string
	team2: string
	resultpoints1: string
	resultpoints2: string
	walkover: boolean
	category_desc: string
}

interface AccordionTorneoProps {
	dataPartidos?: Partido[]
}

function AccordionTorneo({ dataPartidos }: Readonly<AccordionTorneoProps>) {
	const [isExpanded, setIsExpanded] = useState(false)

	const partidosPorFecha = dataPartidos?.reduce(
		(acc, partido) => {
			const fecha = new Date(partido.matchdate).toLocaleDateString(
				'es-ES'
			)
			if (!acc[fecha]) {
				acc[fecha] = []
			}
			acc[fecha].push(partido)
			return acc
		},
		{} as Record<string, Partido[]>
	)

	return (
		<Accordion style={{ marginTop: 20, borderRadius: 16, elevation: 3 }}>
			<AccordionItem
				value="item1"
				style={{
					borderRadius: 16,
					backgroundColor: 'transparent'
				}}
			>
				<AccordionHeader>
					<AccordionTrigger
						style={{
							height: 80,
							elevation: 3,
							backgroundColor: 'white',
							borderRadius: 16
						}}
						onPress={() => setIsExpanded(!isExpanded)}
					>
						<XStack
							space="$4"
							alignItems="center"
							justifyContent="center"
							width="100%"
						>
							<AccordionTitleText
								style={{
									fontSize: 19,
									fontFamily: 'regular',
									textAlign: 'center',
									flexShrink: 1
								}}
							>
								Partidos Programados
							</AccordionTitleText>
							<AccordionIcon>
								<AntDesign
									name={isExpanded ? 'up' : 'down'}
									size={24}
									color="black"
								/>
							</AccordionIcon>
						</XStack>
					</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent>
					<AccordionContentText
						style={{ marginTop: 20, paddingBottom: 40 }}
					>
						<YStack>
							{Object.entries(partidosPorFecha ?? {}).map(
								([fecha, partidos]) => (
									<YStack key={fecha} marginBottom="$4">
										{partidos.map((partido) => (
											<CardPartidos
												key={partido.match_id}
												fechaPartido={partido.matchdate}
												equipo1={partido.team1}
												equipo2={partido.team2}
												puntosEquipo1={
													partido.resultpoints1
												}
												puntosEquipo2={
													partido.resultpoints2
												}
												categoria={
													partido.category_desc
												}
											/>
										))}
									</YStack>
								)
							)}
						</YStack>
					</AccordionContentText>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}

export default AccordionTorneo

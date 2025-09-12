import OurCard from '@/components/ui/ourCard'
import { getLuxonDate } from '@/utils/date'
import { mergeStyles } from '@/utils/styles'
import { XStack, YStack } from '@tamagui/stacks'
import { Text } from '@tamagui/web'
import { StyleSheet } from 'react-native'

interface CardPartidosProps {
	fechaPartido?: any
	horaPartido?: string
	equipo1?: string
	equipo2?: string
	puntosEquipo1?: any
	puntosEquipo2?: any
	walkover?: boolean
	puntosElo?: any
	categoria?: string
	state?: string
}
function CardPartidos({
	fechaPartido,
	horaPartido,
	equipo1,
	equipo2,
	puntosEquipo1,
	puntosEquipo2,
	walkover,
	puntosElo,
	categoria,
	state
}: Readonly<CardPartidosProps>) {
	const fecha = fechaPartido ? getLuxonDate(fechaPartido) : null
	const fechaFormateada = fecha ? fecha.toFormat('dd/MM/yyyy') : ''
	const horaFormateada = fecha ? fecha.toFormat('HH:mm') : ''
	console.log({ 'fecha y hora': fechaFormateada, horaFormateada })

	let estado = 'Pasado'
	let backgroundColor = '#d6d6d6'
	let textColor = '#000000'

	if (state) {
		if (state === 'F') {
			estado = 'Finalizado'
			backgroundColor = '#d6d6d6'
			textColor = '#000'
		} else if (state === 'P') {
			estado = 'Próximo'
			backgroundColor = '#f3f4ef'
			textColor = '#2ad14c'
		} else {
			estado = 'En juego'
			backgroundColor = '#f39c12'
			textColor = '#fff'
		}
	} else if (fecha) {
		const ahora = getLuxonDate(new Date(), { utc: true }).toUTC()
		const esProximo = fecha > ahora
		estado = esProximo ? 'Próximo' : 'Pasado'
		backgroundColor = esProximo ? '#2ad14c' : '#d6d6d6'
		textColor = esProximo ? '#fff' : '#2ad14c'
	}

	const walkoverEstado = walkover === true ? 'W.O.' : ''

	const puntosEloEquipo1 =
		puntosEquipo1 > puntosEquipo2
			? `+${puntosElo}`
			: puntosEquipo1 < puntosEquipo2
				? `-${puntosElo}`
				: '0'

	const puntosEloEquipo2 =
		puntosEquipo2 > puntosEquipo1
			? `+${puntosElo}`
			: puntosEquipo2 < puntosEquipo1
				? `-${puntosElo}`
				: '0'

	return (
		<OurCard style={mergeStyles(styles.card, { backgroundColor })}>
			<XStack style={styles.header}>
				<XStack style={styles.leftHeader}>
					<Text style={[styles.fecha, { color: textColor }]}>
						{fechaFormateada}
					</Text>
					<Text style={[styles.categoria, { color: '#000' }]}>
						{categoria}
					</Text>
				</XStack>

				<XStack style={styles.rightHeader}>
					<Text style={[styles.hora, { color: 'red' }]}>
						{walkoverEstado}
					</Text>
					<Text
						style={[
							styles.estado,
							{ backgroundColor, color: textColor }
						]}
					>
						{estado}
					</Text>
				</XStack>
			</XStack>

			<XStack style={styles.content}>
				<YStack style={styles.teamWrapper}>
					{/* <FontAwesome6
						name="shield-dog"
						size={48}
						color="black"
						style={styles.icon}
					/> */}
					<Text
						numberOfLines={2}
						ellipsizeMode="tail"
						style={styles.teamName}
					>
						{equipo1}
					</Text>
					<Text
						numberOfLines={2}
						ellipsizeMode="tail"
						style={[
							styles.eloPoints,
							puntosEquipo1 > puntosEquipo2
								? styles.eloPositive
								: puntosEloEquipo1 < puntosEquipo2
									? styles.eloNegative
									: styles.eloNeutral
						]}
					>
						{puntosEloEquipo1}
					</Text>
				</YStack>

				<YStack style={{ alignItems: 'center' }}>
					{/* Marcador */}
					<XStack
						style={{
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<Text style={styles.score}>{puntosEquipo1}</Text>
						<Text style={styles.score}> - </Text>
						<Text style={styles.score}>{puntosEquipo2}</Text>
					</XStack>

					{/* Hora */}
					{horaFormateada && (
						<Text
							style={[
								styles.hora,
								{
									color: textColor,
									textAlign: 'center',
									marginTop: 2,
									marginLeft: 16
								}
							]}
						>
							{horaFormateada}
						</Text>
					)}
				</YStack>

				<YStack style={styles.teamWrapper}>
					{/* <FontAwesome6
						name="shield-dog"
						size={48}
						color="black"
						style={styles.icon}
					/> */}
					<Text
						numberOfLines={2}
						ellipsizeMode="tail"
						style={styles.teamName}
					>
						{equipo2}
					</Text>
					<Text
						numberOfLines={2}
						ellipsizeMode="tail"
						style={[
							styles.eloPoints,
							puntosEquipo2 > puntosEquipo1
								? styles.eloPositive
								: puntosEquipo2 < puntosEquipo1
									? styles.eloNegative
									: styles.eloNeutral
						]}
					>
						{puntosEloEquipo2}
					</Text>
				</YStack>
			</XStack>
		</OurCard>
	)
}

export default CardPartidos

const styles = StyleSheet.create({
	card: {
		marginVertical: 8,
		borderRadius: 16,
		padding: 16,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
		backgroundColor: '#fff',
		width: '100%',
		maxWidth: '100%',
		overflow: 'hidden'
	},
	header: {
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 12,
		paddingBottom: 8,
		borderBottomWidth: 1,
		borderBottomColor: 'black'
	},
	leftHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8
	},
	rightHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8
	},
	fecha: {
		fontSize: 14,
		fontWeight: '500',
		color: '#555'
	},
	categoria: {
		fontSize: 14,
		fontWeight: '600',
		color: '#000',
		marginHorizontal: 8
	},
	hora: {
		fontSize: 14,
		marginTop: 4,
		fontWeight: '500',
		color: '#555',
		marginRight: 14
	},
	estado: {
		fontSize: 12,
		fontWeight: 'bold',
		color: 'white',
		paddingHorizontal: 8,
		paddingVertical: 2,
		borderRadius: 12
	},
	content: {
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%'
	},
	icon: {
		marginBottom: 8
	},
	scoreContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		minWidth: 80,
		flexDirection: 'column'
	},
	score: {
		fontSize: 24,
		fontWeight: '900',
		color: '#333'
	},
	eloPositive: {
		color: 'green'
	},
	eloNegative: {
		color: 'red'
	},
	eloNeutral: {
		color: 'gray'
	},
	teamWrapper: {
		flex: 1,
		alignItems: 'center',
		maxWidth: '30%',
		justifyContent: 'center'
	},
	teamName: {
		fontSize: 14,
		fontWeight: '500',
		textAlign: 'center',
		justifyContent: 'center',
		maxWidth: '100%',
		minHeight: 40
	},
	eloPoints: {
		fontSize: 14,
		fontWeight: 'bold'
	}
})

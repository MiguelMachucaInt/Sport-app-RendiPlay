import OurCard from '@/components/ui/ourCard'
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
	categoria
}: Readonly<CardPartidosProps>) {
	const formatDate = (isoDate: string) => {
		if (!isoDate) return ''

		const date = new Date(isoDate)
		const day = date.getDate().toString().padStart(2, '0')
		const month = (date.getMonth() + 1).toString().padStart(2, '0')
		const year = date.getFullYear()

		return `${day}/${month}/${year}`
	}

	const isIsoDate = fechaPartido?.includes('T')

	const fechaFormateada = isIsoDate ? formatDate(fechaPartido) : fechaPartido

	// Determinar estado del partido
	const fechaHoraPartido = isIsoDate
		? new Date(fechaPartido)
		: new Date(`${fechaPartido} ${horaPartido}`)

	const walkoverEstado = walkover === true ? 'W.O.' : ''
	const ahora = new Date()
	const esProximo = fechaHoraPartido > ahora
	const estado = esProximo ? 'Próximo' : 'Pasado'
	const backgroundColor = esProximo ? '#2ad14c' : '#d6d6d6'
	const textColor = esProximo ? '#ffffff' : '#000000'

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
				{/* {mostrarHora && (
					<Text style={[styles.hora, { color: textColor }]}>
						{horaFormateada}
					</Text>
				)} */}
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

				<YStack style={styles.scoreContainer}>
					<Text style={styles.score}>
						{puntosEquipo1} - {puntosEquipo2}
					</Text>
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
		minWidth: 80
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

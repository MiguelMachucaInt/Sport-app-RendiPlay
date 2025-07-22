import { Dimensions, Platform, StyleSheet } from 'react-native'

const { width } = Dimensions.get('window')

const isWeb = Platform.OS === 'web'

export const stylesHeaders = StyleSheet.create({
	ovalHeader: {
		width: width * 2,
		height: 450,
		borderBottomLeftRadius: width * 2,
		borderBottomRightRadius: width * 2,
		alignSelf: 'center',
		position: 'absolute',
		top: -180,
		zIndex: -1
	},
	ovalLogin: {
		width: 573,
		height: 571,
		left: 68,
		borderRadius: width,
		alignSelf: 'flex-start',
		position: 'absolute',
		top: -17,
		zIndex: -1
	},
	headerWrapper: {
		height: 100,
		width: '100%',
		top: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center', // Cambiado a center
		position: 'relative',
		zIndex: 10
	},
	iconLeft: {
		position: 'absolute',
		left: 20, // Distancia exacta desde el borde izquierdo
		zIndex: 11,
		width: 44,
		height: 44,
		justifyContent: 'center'
	},
	titleContainer: {
		maxWidth: '70%', // Ancho máximo para el título
		alignItems: 'center',
		justifyContent: 'center'
	},
	headerTitle: {
		color: 'white',
		fontSize: 23,
		fontWeight: '800',
		textAlign: 'center',
		includeFontPadding: false
	},
	iconRight: {
		position: 'absolute',
		right: 20, // Distancia exacta desde el borde derecho
		zIndex: 11,
		width: 44,
		height: 44,
		justifyContent: 'center'
	},
	container: {
		flex: 1,
		backgroundColor: 'white',
		position: 'relative'
	},
	webContainer: {
		maxWidth: 450, // Ancho máximo para web
		width: '100%',
		marginHorizontal: 'auto',
		overflow: 'hidden',
		boxShadow: '0 0 20px rgba(0,0,0,0.1)',
		height: 100
	}
})

export const stylesProfile = StyleSheet.create({
	vStack: {
		paddingHorizontal: 10,
		overflow: 'scroll',
		marginBottom: 15
	},
	imageContainer: {
		marginTop: 30,
		alignItems: 'flex-start',
		flexDirection: 'row',
		gap: 4
	},
	card: {
		width: 185,
		aspectRatio: 1,
		borderRadius: 8,
		overflow: 'hidden'
	},
	loaderContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	image: {
		width: '100%',
		height: '100%'
	},
	userName: {
		fontSize: 17,
		lineHeight: 24,
		marginTop: 16,
		fontWeight: '500'
	},
	sectionContainer: {
		width: '100%',
		alignItems: 'center',
		marginTop: 16
	},
	title: {
		fontSize: 20,
		lineHeight: 24,
		fontWeight: '800',
		textAlign: 'center'
	},
	dataContainer: {
		width: '100%',
		marginTop: 16
	},
	dataRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginVertical: 8,
		paddingHorizontal: 8
	},
	dataLabel: {
		fontSize: 15,
		fontWeight: '500',
		textAlign: 'left',
		color: 'rgba(0, 0, 0, 0.6)',
		flex: 1
	},
	dataValue: {
		fontSize: 15,
		fontWeight: '400',
		textAlign: 'right',
		flex: 1
	},
	carouselContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 10
	},
	arrowLeft: {
		position: 'absolute',
		left: 5,
		zIndex: 1,
		padding: 10
	},
	arrowRight: {
		position: 'absolute',
		right: 5,
		zIndex: 1,
		padding: 10
	},
	chartsContainer: {
		width: '100%'
	},
	chartWrapper: {
		width: Dimensions.get('window').width - 20
		// marginHorizontal: 10
	},
	indicatorContainer: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	indicator: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: '#ccc',
		marginHorizontal: 5
	},
	activeIndicator: {
		backgroundColor: '#ff0000'
	},
	containerTitleChart: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginHorizontal: 10
	},
	chartTitle: {
		fontSize: 18,
		fontWeight: '600',
		textAlign: 'center',
		marginBottom: 10,
		color: '#333'
	},
	chartStyle: {
		marginVertical: 8,
		borderRadius: 16,
		backgroundColor: '#ffffff',
		padding: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3
	},
	statItem: {
		marginVertical: 10,
		width: '100%',
		alignItems: 'center'
	},
	statRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		alignItems: 'center'
	},
	statValue: {
		fontSize: 38
	},
	progressBar: {
		width: '100%',
		marginTop: 5
	},
	statsWrapper: {
		width: '48%'
	},
	sporsContainer: {
		alignItems: 'center'
	},
	statsGroupContainer: {
		width: Dimensions.get('window').width * 0.48,
		paddingHorizontal: 10
	}
})

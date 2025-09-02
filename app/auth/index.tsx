import { colors } from '@/assets/colors/styles'
import AppleSignInButton from '@/components/appleSignInButton'
import GoogleSignInButton from '@/components/googleSignInButton'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useFocusEffect } from '@react-navigation/native'
import { isIos } from '@tamagui/core'
import { Image } from '@tamagui/image'
import { Link } from 'expo-router'
import { useCallback, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function InitialScreen() {
	const [showButton, setShowButton] = useState(true)

	function handlePress() {
		setShowButton(false)
	}

	useFocusEffect(
		useCallback(() => {
			setShowButton(true)
		}, [])
	)

	return (
		<View style={styles.container}>
			<View style={styles.containerPick}>
				<Image
					source={require('@/assets/images/logo_sport.png')}
					style={{
						width: '100%',
						height: '50%',
						top: 20
					}}
				/>
			</View>
			<View style={{ marginVertical: 30, gap: 8 }}>
				<GoogleSignInButton
					show={showButton}
					onPress={handlePress}
					onResponded={(res) => {
						if (
							['cancel', 'dismiss', 'error'].includes(res?.type)
						) {
							setShowButton(true)
						}
					}}
				/>
				{isIos && <AppleSignInButton onPress={handlePress} />}
			</View>
			{!showButton && !isIos && (
				<View style={{ alignItems: 'center', paddingTop: 40 }}>
					<MaterialIcons
						name="swipe-up"
						size={50}
						color={colors.primary.naranja}
					/>
					<Text
						style={{
							color: colors.primary.naranja,
							fontSize: 18,
							fontWeight: 'bold'
						}}
					>
						Deslice hacia arriba
					</Text>
				</View>
			)}

			<Link
				href={'/(main)/(home)'}
				style={{
					marginTop: 30,
					paddingVertical: 5,
					paddingHorizontal: 20,
					backgroundColor: colors.primary.naranja,
					borderRadius: 8,
					fontWeight: 'bold',
					color: 'white',
					textAlign: 'center',
					overflow: 'hidden'
				}}
			>
				Ir a Inicio
			</Link>
			<Image
				source={require('@/assets/images/logo.png')}
				style={styles.logo}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 20
	},
	containerPick: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		top: '10%'
	},
	button: {
		width: '80%',
		marginVertical: 10
	},
	buttonsContainer: {
		flex: 0.4,
		width: '100%',
		justifyContent: 'flex-start',
		alignItems: 'center',
		top: 10
	},
	logo: {
		position: 'absolute',
		width: 100,
		height: 100,
		top: 25,
		left: isIos ? 3 : 10
	}
})

import { useAuthStore } from '@/state/auth'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function BlockedOverlay({ show }: { show?: boolean }) {
	const { user } = useAuthStore()
	if (!user?.blocked || !show) return null

	return (
		<View style={styles.overlay}>
			<Text style={styles.text}>BLOQUEADO</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	overlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 999,
		pointerEvents: 'none'
	},
	text: {
		fontSize: 40,
		fontWeight: 'bold',
		color: 'rgba(255, 0, 0, 0.3)',
		transform: [{ rotate: '-30deg' }]
	}
})

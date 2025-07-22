import { withTouch } from '@/utils/hocs/withTouchable'
import { Touchable } from '@/utils/interfaces'
import { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'

interface IconButtonProps extends Touchable {
	icon: ReactNode
}
function IconButton({ icon }: Readonly<IconButtonProps>) {
	return (
		<View style={styles.container}>
			{icon}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		borderRadius: 20,
		backgroundColor: 'rgba(221, 211, 211, 0.3)',
		alignSelf: 'flex-start',
		padding: 4
	}
})

export default withTouch(IconButton)

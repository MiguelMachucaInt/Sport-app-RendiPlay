import { withControl } from '@/utils/hocs/withControl'
import { withLabel } from '@/utils/hocs/withLabel'
import { Labelable } from '@/utils/interfaces'
import { mergeStyles } from '@/utils/styles'
import { Platform, StyleSheet } from 'react-native'
import { IInputFieldProps, IInputProps, Input, InputField } from '../input'

interface OurInputProps extends Labelable, IInputFieldProps {
	containerProps?: IInputProps
}
function OurInput({ containerProps, ...props }: Readonly<OurInputProps>) {
	return (
		<Input
			{...containerProps}
			style={mergeStyles(styles.container, containerProps?.style)}
		>
			<InputField {...props} style={[styles.input, props.style]} />
		</Input>
	)
}

const styles = StyleSheet.create({
	container: {
		borderRadius: 18,
		height: Platform.select({
			ios: 50,
			android: 55
		}),
		borderColor: 'transparent',
		justifyContent: 'center'
	},
	input: {
		backgroundColor: 'rgba(128, 128, 128, 0.3)',
		paddingHorizontal: 12,
		paddingVertical: Platform.select({
			ios: 10,
			android: 8
		}),
		fontSize: 16,
		borderRadius: 14,
		color: '#000',
		minHeight: 45
	}
})

export default withControl(withLabel(OurInput))

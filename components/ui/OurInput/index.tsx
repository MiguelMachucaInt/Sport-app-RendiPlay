import { withControl } from '@/utils/hocs/withControl'
import { withLabel } from '@/utils/hocs/withLabel'
import { Labelable } from '@/utils/interfaces'
import { mergeStyles } from '@/utils/styles'
import { StyleSheet } from 'react-native'
import { IInputFieldProps, IInputProps, Input, InputField } from '../input'

interface OurInputProps extends Labelable, IInputFieldProps {
    containerProps?: IInputProps
}
function OurInput({ containerProps, ...props }: Readonly<OurInputProps>) {
    return (
        <Input {...containerProps} style={mergeStyles(styles.container, containerProps?.style)}>
            <InputField
                {...props}
                style={[styles.input, props.style]}
            />
        </Input>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 18,
        height: 50,
        borderColor: 'transparent'
    },
    input: {
        backgroundColor: 'rgba(128, 128, 128, 0.3)'
    }
})

export default withControl(withLabel(OurInput))

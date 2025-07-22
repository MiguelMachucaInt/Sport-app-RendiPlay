import { mergeStyles } from '@/utils/styles'
import { PropsWithChildren } from 'react'
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native'

interface TouchableProps extends PropsWithChildren, TouchableOpacityProps { }
function OurTouchable({ children, ...props }: Readonly<TouchableProps>) {
    return (
        <TouchableOpacity {...props} style={mergeStyles(styles.container, props.style)}>
            {children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 5,
    }
})

export default OurTouchable

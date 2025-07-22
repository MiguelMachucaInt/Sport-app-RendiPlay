import { mergeStyles } from '@/utils/styles'
import { StyleSheet, View, ViewProps } from 'react-native'

interface OurCardProps extends ViewProps { }
function OurCard({ ...props }: Readonly<OurCardProps>) {
    return (
        <View
            {...props}
            style={mergeStyles(styles.card, props.style)}
        />
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderWidth: 0.1,

        // Sombra para iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,

        // Elevación para Android
        elevation: 5,

        // Opcional: margen para separar de otros elementos
        marginVertical: 5,
        marginHorizontal: 2
    },
})

export default OurCard

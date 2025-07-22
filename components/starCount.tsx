import AntDesign from '@expo/vector-icons/AntDesign'
import { isIos } from '@tamagui/core'
import { Text, View } from 'react-native'

interface StarCountProps {
    count: number
    iconProps?: any
}
function StarCount({ count, iconProps }: Readonly<StarCountProps>) {
    return (
        <View style={{ position: 'relative' }}>
            <AntDesign name="star" size={24} color="yellow" {...iconProps}>
            </AntDesign>
            <Text style={{ position: 'absolute', left: isIos ? 7 : 8, top: 3, fontWeight: 'bold' }}>{count}</Text>
        </View>
    )
}

export default StarCount

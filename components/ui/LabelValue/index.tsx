import { XStack } from '@tamagui/stacks'
import { SizableText } from '@tamagui/text'
import { StyleSheet } from 'react-native'

interface LabelValueProps {
    label: string
    value: string
}
function LabelValue({ label, value }: Readonly<LabelValueProps>) {
    return (
        <XStack gap={3}>
            <SizableText fontWeight={'800'}>{label}</SizableText>
            <SizableText>{value}</SizableText>
        </XStack>
    )
}

const styles = StyleSheet.create({})

export default LabelValue

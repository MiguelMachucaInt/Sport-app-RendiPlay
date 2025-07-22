import { mergeStyles } from '@/utils/styles'
import { XStack, XStackProps } from '@tamagui/stacks'
import { StyleProp, ViewStyle } from 'react-native'
import OurBadge, { OurBadgeProps } from '../ui/OurBadge'

interface BadgesProps {
    containerProps?: XStackProps
    badgeProps?: Partial<OurBadgeProps>
    data: {
        id: string
        desc: string
        styles?: StyleProp<ViewStyle>
    }[]
}
function Badges({ containerProps, data, badgeProps }: Readonly<BadgesProps>) {
    return (
        <XStack {...containerProps} >
            {
                data.map(el => <OurBadge {...badgeProps} style={mergeStyles(badgeProps?.style, el.styles)} key={el.id} text={el.desc} />)
            }
        </XStack>
    )
}


export default Badges

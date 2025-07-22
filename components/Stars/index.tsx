import { withScroll } from '@/utils/hocs/withScrollView'
import { Scrolleable } from '@/utils/interfaces'
import AntDesign from '@expo/vector-icons/AntDesign'
import { XStack, XStackProps, YStack, YStackProps } from '@tamagui/stacks'

interface StarsProps extends Scrolleable {
    count?: number
    vertical?: boolean
    containerProps?: YStackProps | XStackProps
    iconProps?: any
}
function Stars({ count = 1, vertical, containerProps, iconProps }: Readonly<StarsProps>) {
    return (
        <Base vertical={vertical} gap={5} {...containerProps}>
            {Array.from({ length: count }).map((_, i) =>
                <AntDesign key={i} name="star" size={18} color="yellow" {...iconProps} />
            )}
        </Base>
    )
}

function Base({ children, vertical, ...props }) {
    return vertical ? <YStack {...props}>{children}</YStack> : <XStack {...props}>{children}</XStack>
}

export default withScroll(Stars)

import { colors } from '@/assets/colors/styles'
import { YStack, YStackProps } from '@tamagui/stacks'
import { Spinner } from './ui/spinner'

interface LoadingProps extends YStackProps { }
function Loading({ ...props }: Readonly<LoadingProps>) {
    return (
        <YStack alignItems='center' justifyContent='center' flex={1} {...props}>
            <Spinner color={colors.primary.naranja} size={'large'} />
        </YStack>
    )
}

export default Loading

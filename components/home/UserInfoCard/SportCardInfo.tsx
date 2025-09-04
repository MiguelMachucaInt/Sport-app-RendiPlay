import StarCount from '@/components/starCount'
import { SportPoint } from '@/models/sport'
import { isIos } from '@tamagui/core'
import { XStack, YStack } from '@tamagui/stacks'
import { SizableText } from '@tamagui/text'

interface SportCardInfoProps {
	data: SportPoint
}
function SportCardInfo({ data }: Readonly<SportCardInfoProps>) {
	return (
		<YStack>
			<SizableText
				color={'white'}
				fontWeight={'600'}
				fontSize={isIos ? 11 : 13}
			>
				{data.sportdesc}
			</SizableText>

			<XStack gap={5} alignItems="center" width={'100%'} marginLeft={7}>
				<SizableText
					color={'white'}
					fontWeight={'600'}
					fontSize={isIos ? 12 : 14}
					width={180}
				>
					{data.category_desc}
				</SizableText>
				<SizableText
					color={'white'}
					fontWeight={'600'}
					fontSize={isIos ? 13 : 15}
					width={isIos ? 73 : 70}
				>
					{data.points} pts
				</SizableText>
				{data.stars ? <StarCount count={data.stars} /> : null}
			</XStack>
		</YStack>
	)
}

export default SportCardInfo

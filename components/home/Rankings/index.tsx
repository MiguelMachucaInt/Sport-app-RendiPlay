import OurCarousel from '@/components/ourCarousel'
import OurTouchable from '@/components/Touchable'
import { Sport } from '@/models/sport'
import { YStack } from '@tamagui/stacks'
import { SizableText } from '@tamagui/text'
import { router } from 'expo-router'
import SportIcon from './Sport'

interface RankingsProps {
	data: Sport[]
}
function Rankings({ data }: Readonly<RankingsProps>) {
	return (
		<YStack gap={25} alignItems="center">
			<SizableText
				alignSelf="flex-start"
				fontWeight={'800'}
				fontSize={18}
			>
				Mis Rankings
			</SizableText>
			<OurCarousel
				data={data}
				renderItem={({ item }) => {
					return (
						<OurTouchable
							activeOpacity={0.4}
							key={item.sport_id}
							onPress={() =>
								router.push(`/ranking/${item.sport_id}`)
							}
						>
							<SportIcon sport={item} />
						</OurTouchable>
					)
				}}
				height={90}
				width={80}
			/>
		</YStack>
	)
}

export default Rankings

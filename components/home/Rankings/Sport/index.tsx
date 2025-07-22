import WallyImage from '@/assets/images/wally.png'
import { Sport } from '@/models/sport'
import { YStack, YStackProps } from '@tamagui/stacks'
import { SizableText } from '@tamagui/text'
import { Image } from 'react-native'

const sportImages = {
	WALLY: WallyImage
}

interface SportIconProps {
	sport: Sport
	containerProps?: YStackProps
}
function SportIcon({ sport, containerProps }: Readonly<SportIconProps>) {
	return (
		<YStack alignItems="center" gap={5} {...containerProps}>
			<Image source={sportImages?.[sport.sport_id]} style={{ width: 45, height: 45 }} />
			<SizableText fontWeight={'600'}>{sport.sportdesc}</SizableText>
		</YStack>
	)
}

export default SportIcon

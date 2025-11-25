import OurCarousel from '@/components/ourCarousel'
import { SizableText } from '@tamagui/text'
import { Image, ImageSourcePropType, View } from 'react-native'

export interface BannerItem {
	id: string
	image?: ImageSourcePropType
	title?: string
}

interface TopBannerCarouselProps {
	data: BannerItem[]
}

export default function TopBannerCarousel({ data }: TopBannerCarouselProps) {
	return (
		<OurCarousel
			data={data}
			height={220}
			loop
			autoPlay
			renderItem={({ item }) => (
				<View
					style={{
						height: 220,
						position: 'relative',
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: 'white'
					}}
				>
					<Image
						source={item.image}
						resizeMode="contain"
						style={{
							width: '100%',
							height: '100%',
							borderRadius: 10
						}}
					/>
					{item.title && (
						<SizableText
							fontSize={18}
							color="white"
							position="absolute"
							bottom={10}
							fontWeight="bold"
							textAlign="center"
							backgroundColor="rgba(0,0,0,0.5)"
							paddingHorizontal={10}
							paddingVertical={4}
							borderRadius={6}
						>
							{item.title}
						</SizableText>
					)}
				</View>
			)}
		/>
	)
}

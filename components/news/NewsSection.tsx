import { YStack } from '@tamagui/stacks'
import {
	Image,
	Text,
	TouchableOpacity,
	useWindowDimensions,
	View
} from 'react-native'

import { newsData } from '@/components/news/newsData'
import { useRouter } from 'expo-router'

export default function NewsSection() {
	const { width } = useWindowDimensions()
	const imageHeight = width * 0.5
	const smallCardHeight = width * 0.25
	const router = useRouter()

	return (
		<YStack
			style={{
				paddingHorizontal: 12,
				paddingVertical: 8
			}}
		>
			<TouchableOpacity
				style={{ height: 200 }}
				onPress={() =>
					router.push(`(main)/(home)/${newsData[0].id}` as any)
				}
			>
				<View style={{ position: 'relative' }}>
					<Image
						source={newsData[0].image}
						style={{
							width: '100%',
							height: imageHeight,
							borderRadius: 12
						}}
						resizeMode="cover"
					/>
					<View
						style={{
							position: 'absolute',
							top: 10,
							left: 10,
							backgroundColor: '#F44336',
							paddingHorizontal: 8,
							paddingVertical: 4,
							borderRadius: 6
						}}
					>
						<Text style={{ color: 'white', fontSize: 12 }}>
							{newsData[0].tag}
						</Text>
					</View>
					<View
						style={{
							position: 'absolute',
							bottom: 10,
							left: 10,
							right: 10
						}}
					>
						<Text
							style={{
								fontWeight: 'bold',
								fontSize: 16,
								color: 'white'
							}}
							numberOfLines={1}
						>
							{newsData[0].title}
						</Text>
						<Text
							style={{ color: 'white', fontSize: 12 }}
							numberOfLines={1}
						>
							{newsData[0].subtitle}
						</Text>
					</View>
				</View>
			</TouchableOpacity>

			<View
				style={{
					flexDirection: 'row',
					flexWrap: 'wrap',
					gap: 5
				}}
			>
				{newsData.slice(1).map((item) => (
					<TouchableOpacity
						key={item.id}
						onPress={() =>
							router.push(`(main)/(home)/${item.id}` as any)
						}
						style={{ width: '49%' }}
					>
						<View style={{ position: 'relative' }}>
							<Image
								source={item.image}
								style={{
									width: '100%',
									height: smallCardHeight,
									borderRadius: 10
								}}
								resizeMode="cover"
							/>
							<View
								style={{
									position: 'absolute',
									top: 8,
									left: 8,
									backgroundColor: '#F44336',
									paddingHorizontal: 6,
									paddingVertical: 2,
									borderRadius: 4
								}}
							>
								<Text style={{ color: 'white', fontSize: 12 }}>
									{item.tag}
								</Text>
							</View>
							<View
								style={{
									position: 'absolute',
									bottom: 8,
									left: 8,
									right: 8
								}}
							>
								<Text
									style={{
										fontWeight: 'bold',
										fontSize: 13,
										color: 'white'
									}}
									numberOfLines={1}
								>
									{item.title}
								</Text>
							</View>
						</View>
					</TouchableOpacity>
				))}
			</View>
		</YStack>
	)
}

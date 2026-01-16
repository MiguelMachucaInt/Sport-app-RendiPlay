'use client'

import { News } from '@/models/news.model'
import NoticiasService from '@/services/news'
import { YStack } from '@tamagui/stacks'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import {
	ActivityIndicator,
	Image,
	Text,
	TouchableOpacity,
	View,
	useWindowDimensions
} from 'react-native'

export default function NewsSection() {
	const { width } = useWindowDimensions()
	const imageHeight = width * 0.5
	const smallCardHeight = width * 0.25
	const smallCardMargin = 5
	const smallCardWidth = (width - 12 * 2 - smallCardMargin) / 2
	const router = useRouter()

	const [news, setNews] = useState<News[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		NoticiasService.getNoticias()
			.then((data) => {
				const enabledNews = data.filter(
					(item) => item.enabled !== false
				)

				const others = enabledNews.filter(
					(item) => item.tag !== 'OurCarousel'
				)

				const orderedOthers = others.sort((a, b) => {
					return (a.order ?? 999) - (b.order ?? 999)
				})

				setNews(orderedOthers)

				orderedOthers.forEach((item) => {
					if (item.image?.uri) Image.prefetch(item.image.uri)
					item.extraSections?.forEach((section) => {
						if (section.image?.uri)
							Image.prefetch(section.image.uri)
					})
				})
			})
			.finally(() => setLoading(false))
	}, [])

	if (loading) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<ActivityIndicator size="large" color="#f44336" />
			</View>
		)
	}

	if (!news.length) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<Text>No hay noticias disponibles</Text>
			</View>
		)
	}

	return (
		<YStack style={{ paddingHorizontal: 12, paddingVertical: 8 }}>
			{/* Noticia principal */}
			<TouchableOpacity
				style={{ marginBottom: 12 }}
				onPress={() =>
					router.push(`(main)/(home)/${news[0].id}` as any)
				}
			>
				<View style={{ position: 'relative' }}>
					<Image
						source={news[0].image}
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
							{news[0].tag}
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
							{news[0].title}
						</Text>
						<Text
							style={{ color: 'white', fontSize: 12 }}
							numberOfLines={1}
						>
							{news[0].subtitle}
						</Text>
					</View>
				</View>
			</TouchableOpacity>

			{/* Otras noticias */}
			<View
				style={{
					flexDirection: 'row',
					flexWrap: 'wrap',
					justifyContent: 'space-between'
				}}
			>
				{news.slice(1).map((item) => (
					<TouchableOpacity
						key={item.id}
						style={{ width: smallCardWidth, marginBottom: 5 }}
						onPress={() =>
							router.push(`(main)/(home)/${item.id}` as any)
						}
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

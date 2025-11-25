import Loading from '@/components/Loading'
import { News } from '@/models/news.model'
import NoticiasService from '@/services/news'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import {
	Dimensions,
	Image,
	ScrollView,
	Text,
	TouchableOpacity,
	View
} from 'react-native'

export default function NewsDetailScreen() {
	const { id } = useLocalSearchParams()
	const router = useRouter()
	const screenWidth = Dimensions.get('window').width
	const [newsItem, setNewsItem] = useState<News | null>(null)
	const [loading, setLoading] = useState(true)
	const [imgHeight, setImgHeight] = useState<number>(220)

	useEffect(() => {
		setLoading(true)
		setNewsItem(null)

		if (id) {
			NoticiasService.getNoticiaById(id as string)
				.then((data) => {
					setNewsItem(data)

					if (data.image?.uri) {
						Image.getSize(data.image.uri, (w, h) => {
							setImgHeight((h / w) * (screenWidth - 32))
						})

						Image.prefetch(data.image.uri)
					}

					data.extraSections?.forEach((section) => {
						if (section.image?.uri)
							Image.prefetch(section.image.uri)
					})
				})
				.finally(() => setLoading(false))
		}
	}, [id])

	if (loading) {
		return <Loading />
	}

	if (!newsItem) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<Text>Noticia no encontrada</Text>
			</View>
		)
	}

	const formattedDate = newsItem.date
		? new Date(newsItem.date).toLocaleDateString('es-BO', {
				day: 'numeric',
				month: 'long',
				year: 'numeric'
			})
		: 'Fecha no disponible'

	return (
		<ScrollView
			style={{ flex: 1, padding: 16 }}
			contentContainerStyle={{ paddingBottom: 60 }}
		>
			<TouchableOpacity onPress={() => router.back()}>
				<Text style={{ color: '#f44336', marginBottom: 12 }}>
					{'< Volver'}
				</Text>
			</TouchableOpacity>

			<Image
				source={newsItem.image}
				resizeMode="cover"
				style={{
					width: screenWidth - 32,
					height: imgHeight,
					alignSelf: 'center',
					borderRadius: 12,
					marginBottom: 16,
					backgroundColor: '#000'
				}}
			/>

			<Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 4 }}>
				{newsItem.title}
			</Text>

			<Text style={{ fontSize: 14, color: '#999', marginBottom: 12 }}>
				{newsItem.tag} · {formattedDate}
			</Text>

			{newsItem.subtitle && (
				<Text style={{ fontSize: 16, color: '#666', marginBottom: 16 }}>
					{newsItem.subtitle}
				</Text>
			)}

			<Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 20 }}>
				{newsItem.content}
			</Text>

			{newsItem.extraSections && newsItem.extraSections.length > 0 && (
				<View style={{ marginTop: 10 }}>
					{newsItem.extraSections.map((section, index) => (
						<View key={index} style={{ marginBottom: 24 }}>
							{section.title && (
								<Text
									style={{
										fontSize: 18,
										fontWeight: '600',
										marginBottom: 6
									}}
								>
									{section.title}
								</Text>
							)}
							{section.image && (
								<Image
									source={section.image}
									resizeMode="cover"
									style={{
										width: '100%',
										height: 180,
										borderRadius: 10,
										marginBottom: 8
									}}
								/>
							)}
							{section.description && (
								<Text style={{ fontSize: 14, color: '#444' }}>
									{section.description}
								</Text>
							)}
						</View>
					))}
				</View>
			)}
		</ScrollView>
	)
}
